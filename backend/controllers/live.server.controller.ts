import Mitsuba_RX0 from "../shared/models/Mitsuba/RX0"
import Mitsuba_RX1 from "../shared/models/Mitsuba/RX1"
import Mitsuba_RX2 from "../shared/models/Mitsuba/RX2"
import { getMostRecent } from "../helper/helper.route"
import { Response } from "express";
import { DataResponse } from "../shared/sdk/telemetry";
import BMS_RX0 from "../shared/models/BMS/RX0";
import BMS_RX1 from "../shared/models/BMS/RX1";
import BMS_RX2 from "../shared/models/BMS/RX2";
import BMS_RX3 from "../shared/models/BMS/RX3";
import BMS_RX4 from "../shared/models/BMS/RX4";
import BMS_RX5 from "../shared/models/BMS/RX5";
import MPPT_RX0 from "../shared/models/MPPT/RX0";
import MPPT_RX1 from "../shared/models/MPPT/RX1";
import MPPT_RX2 from "../shared/models/MPPT/RX2";
import MPPT_RX3 from "../shared/models/MPPT/RX3";
import MPPT_RX4 from "../shared/models/MPPT/RX4";
import MPPT_RX5 from "../shared/models/MPPT/RX5";
import GPS from "../shared/models/GPS/GPS";
import DistanceTraveled from "../shared/models/Stats/DistanceTraveled";
import LapCount from "../shared/models/Stats/LapCount";
import PowerBoard_RX0 from "../shared/models/PowerBoard/RX0";
import PowerBoard_RX1 from "../shared/models/PowerBoard/RX1";


/**
    Return data for the sensor read outs on the live tab
*/
exports.data = async (req, res: Response<DataResponse>) => {

    async function getMppt(mpptNumber: number) {
        return {
            rx0: await getMostRecent(MPPT_RX0, { mpptNumber }),
            rx1: await getMostRecent(MPPT_RX1, { mpptNumber }),
            rx2: await getMostRecent(MPPT_RX2, { mpptNumber }),
            rx3: await getMostRecent(MPPT_RX3, { mpptNumber }),
            rx4: await getMostRecent(MPPT_RX4, { mpptNumber }),
            rx5: await getMostRecent(MPPT_RX5, { mpptNumber }),
        }
    }

    return res.json({
        gps: await getMostRecent(GPS),
        bms: {
            rx0: await getMostRecent(BMS_RX0),
            rx1: await getMostRecent(BMS_RX1),
            rx2: await getMostRecent(BMS_RX2),
            rx3: await getMostRecent(BMS_RX3),
            rx4: await getMostRecent(BMS_RX4),
            rx5: await getMostRecent(BMS_RX5),
        },
        mitsuba: {
            rx0: await getMostRecent(Mitsuba_RX0),
            rx1: await getMostRecent(Mitsuba_RX1),
            rx2: await getMostRecent(Mitsuba_RX2),
            distance_traveled: await getMostRecent(DistanceTraveled)
        },
        mppt: {
            "1": await getMppt(1),
            "2": await getMppt(2),
            "3": await getMppt(3),
        },
        laps: {
            rx0: await getMostRecent(LapCount)
        },
        powerBoard: {
            rx0: await getMostRecent(PowerBoard_RX0),
            rx1: await getMostRecent(PowerBoard_RX1),
        }
    })
};
