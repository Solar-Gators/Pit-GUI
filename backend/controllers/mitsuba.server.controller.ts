import { NextFunction, Request, Response } from "express"
import Mitsuba_RX0 from "../shared/models/Mitsuba/RX0"
import DistanceTraveled from "../shared/models/Stats/DistanceTraveled"
import { getMostRecent } from "../helper/helper.route"
import { WHEEL_RADIUS_MI } from "../shared/sdk/telemetry"
import { calculateDistanceTraveled } from "../helper/math"


export const rx0Middleware = async (req: Request, res: Response, next: NextFunction) => {
    // get the last rpm value
    const recent = await getMostRecent(Mitsuba_RX0)

    // there is no recent value
    if (!recent) {
        return next()
    }

    // call common method
    calculateDistanceTraveled(
        recent,
        req.body
    )

    next()
}
