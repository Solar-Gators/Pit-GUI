import Mitsuba_RX0 from "../shared/models/Mitsuba/RX0"
import Mitsuba_RX1 from "../shared/models/Mitsuba/RX1"
import Mitsuba_RX2 from "../shared/models/Mitsuba/RX2"
import getMostRecent from "../helper/helper.route"
import { Response } from "express";
import { DataResponse } from "../shared/sdk/telemetry";
import BMS_RX0 from "../shared/models/BMS/RX0";
import BMS_RX1 from "../shared/models/BMS/RX1";
import BMS_RX2 from "../shared/models/BMS/RX2";
import BMS_RX3 from "../shared/models/BMS/RX3";
import BMS_RX4 from "../shared/models/BMS/RX4";
import BMS_RX5 from "../shared/models/BMS/RX5";
import GPS from "../shared/models/GPS/GPS";


/**
    Return data for the sensor read outs on the live tab
*/
exports.data = async (req, res: Response<DataResponse>) => {
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
        }
    })
};
