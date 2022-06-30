/* Dependencies */
import Mitsuba_RX0 from "../models/Mitsuba/RX0"
import Mitsuba_RX1 from "../models/Mitsuba/RX1"
import Mitsuba_RX2 from "../models/Mitsuba/RX2"
import getMostRecent from "../helper/helper.route"


/**
    Return data for the sensor read outs on the live tab
*/
exports.data = async (req, res) => {
    return res.json({
        "gps": {

        },
        "mitsuba": {
            "rx0": await getMostRecent(Mitsuba_RX0),
            "rx1": await getMostRecent(Mitsuba_RX1),
            "rx2": await getMostRecent(Mitsuba_RX2)
        }
    })
};
