import { BMS_RX0_Type } from "../shared/models/BMS/RX0"
import { BMS_RX2_Type } from "../shared/models/BMS/RX2"
import { Mitsuba_RX0_Type } from "../shared/models/Mitsuba/RX0"
import PowerConsumption from "../shared/models/Stats/PowerConsumption"
import DistanceTraveled, { DistanceTraveled_Type } from "../shared/models/Stats/DistanceTraveled"
import { WHEEL_RADIUS_MI } from "../shared/sdk/telemetry"
import { getMostRecent } from "./helper.route"

class CustomModel {
    createdAt?: Date
}

export async function calculateIntegration<T extends CustomModel>(
    previousPoint: T,
    currentPoint: T,
    extractMeasurement: (item: T) => number | null | undefined, // Callback function to extract the value
) {
    // Use the callback function to extract values
    const recentValue = extractMeasurement(previousPoint);
    const newValueValue = extractMeasurement(currentPoint);

    if (isNaN(newValueValue) || newValueValue == undefined) {
        return undefined
    }

    const value = Number(newValueValue)
    const now = currentPoint?.createdAt ? new Date(currentPoint.createdAt) : new Date()
    const nowUnixSec = now.getTime()/1000
    const lastTelemetryUnixSec = previousPoint.createdAt.getTime()/1000

    const secondsSinceTelemetry = nowUnixSec - lastTelemetryUnixSec;
    if (
        // if its older than 5 seconds ignore it since it could be from yesterday or the car could
        // have shut down
        secondsSinceTelemetry > 5
        // if it's negative then there might be an error in the telemetry so ignore it
        || secondsSinceTelemetry <= 0
        // if this is first value then ignore it
        || recentValue == null
    ) {
        return undefined
    }

    const minutesSinceTelemetry = secondsSinceTelemetry / 60;

    // We don't know what the actual function between the two points is, but
    // approximating it as a line should be good enough
    // y = mx + b <- formula for line
    // m = (y2 - y1)/(x2 - x1) <- calculate slope
    // in this case y is rpm and x is time
    const m = (value - recentValue) / minutesSinceTelemetry;
    // we're starting from x = 0 so the y intercept is y1
    const b = recentValue;

    // The area under our line will give us a good estimate
    // We can take a simple integral of our line to get the area under the line
    // ∫ mx + b = 1/2 m x^2 + bx
    return 0.5 * m * Math.pow(minutesSinceTelemetry, 2) + b * minutesSinceTelemetry;
}


export async function calculateDistanceTraveled(
    recent: Mitsuba_RX0_Type,
    newValue: Mitsuba_RX0_Type,
) {
    const rotations = await calculateIntegration(
        recent,
        newValue,
        (item) => item?.motorRPM
    )

    if (rotations == undefined) {
        return
    }

    const milesTraveled = WHEEL_RADIUS_MI * rotations

    const lastTraveled = await getMostRecent(DistanceTraveled)

    if (!lastTraveled) {
        await DistanceTraveled.create({
            distance: milesTraveled
        })
    }
    else {
        await lastTraveled.update({
            distance: lastTraveled?.distance + milesTraveled
        })
    }
}

export async function calculatePower(
    recent_rx0: BMS_RX0_Type,
    recent_rx2: BMS_RX2_Type,
    newValue_rx0: BMS_RX0_Type,
    newValue_rx2: BMS_RX2_Type,
) {

    const pickPower = (point: BMS_RX2_Type) => {
        if (point.id == recent_rx2.id) {
            return recent_rx0.pack_sum_volt_ * recent_rx2.pack_current_
        }

        if (point.id == newValue_rx2.id) {
            return newValue_rx0.pack_sum_volt_ * newValue_rx2.pack_current_
        }

        throw "Whoa something went really wrong"
    }


    const power = await calculateIntegration(
        recent_rx2,
        newValue_rx2,
        pickPower,
    )

    if (power == undefined) {
        return
    }

    return PowerConsumption.create({
        power
    })
}
