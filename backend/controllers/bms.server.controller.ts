import { NextFunction, Request, Response } from "express"
import Mitsuba_RX0 from "../shared/models/Mitsuba/RX0"
import DistanceTraveled from "../shared/models/Stats/DistanceTraveled"
import { getMostRecent } from "../helper/helper.route"
import { WHEEL_RADIUS_MI } from "../shared/sdk/telemetry"
import { calculateDistanceTraveled } from "../helper/math"
import Mitsuba_RX1 from "../shared/models/Mitsuba/RX1"


export const rx2Middleware = async (req: Request, res: Response, next: NextFunction) => {
    // get the last rpm value
    const rx1 = await getMostRecent(Mitsuba_RX1)
    const rx2 = await getMostRecent(Mitsuba_RX0)

    // there is no recent value
    if (!rx1 || rx2) {
        return next()
    }

    // call common method


    next()
}
