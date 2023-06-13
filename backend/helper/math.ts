import { MPPT_RX0_Type } from "../shared/models/MPPT/RX0"
import { Mitsuba_RX0_Type } from "../shared/models/Mitsuba/RX0"
import DistanceTraveled, { DistanceTraveled_Type } from "../shared/models/Stats/DistanceTraveled"
import { WHEEL_RADIUS_MI } from "../shared/sdk/telemetry"
import { getMostRecent } from "./helper.route"

export async function calculateDistanceTraveled(
    recent: Mitsuba_RX0_Type,
    newValue: Mitsuba_RX0_Type,
) {
    // if an rpm wasn't passed then ignore it
    if (isNaN(newValue?.motorRPM) || newValue?.motorRPM == undefined) {
        return
    }

    const motorRPM = Number(newValue.motorRPM)
    const now = newValue?.createdAt ? new Date(newValue.createdAt) : new Date()

    const nowUnixSec = now.getTime()/1000
    const lastTelemetryUnixSec = recent.createdAt.getTime()/1000

    const secondsSinceTelemetry = nowUnixSec - lastTelemetryUnixSec;
    if (
        // if its older than 5 seconds ignore it since it could be from yesterday or the car could
        // have shut down
        secondsSinceTelemetry > 5
        // if it's negative then there might be an error in the telemetry so ignore it
        || secondsSinceTelemetry <= 0
        // if motorRPM is not set then ignore it
        || recent.motorRPM == null
    ) {
        return
    }

    // Our rate is in rotations per minute so to compare apples to apples lets
    // convert the time to minutes
    const minutesSinceTelemetry = secondsSinceTelemetry/60

    // We don't know what the actual function between the two rpm points is, but
    // approximating it as a line should be good enough
    // y = mx + b <- formula for line
    // m = (y2 - y1)/(x2 - x1) <- calculate slope
    // in this case y is rpm and x is time
    const m = (motorRPM - recent.motorRPM) / (minutesSinceTelemetry);
    // we're starting from x = 0 so the y intercept is y1
    const b = recent.motorRPM

    // The area under our line will give us an estimate on the number of rotations
    // We can take a simple integral of our line to get the area under the line
    // ∫ mx + b = 1/2 m x^2 + bx
    const rotations = 0.5 * m * Math.pow(minutesSinceTelemetry, 2) + b * minutesSinceTelemetry

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
