/* Dependencies */
import Mitsuba_RX0 from "../models/Mitsuba/RX0"
import getMostRecent from "../helper/helper.route"


/**
    Return data for the sensor read outs on the live tab
*/
exports.data = async (req, res) => {
    return res.json({
        "mitsuba": {
            "rx0": await getMostRecent(Mitsuba_RX0)
        }
    })
    // var names = [
    //     "speed",
    //     "voltage",
    //     "duration",
    //     "temperature",
    //     "stateofCharge",
    //     "consumption",
    //     "panelPower",
    //     "gps"
    // ]
    // var models = [
    //         sequelizeModels.Speed,
    //         sequelizeModels.Voltage,
    //         sequelizeModels.Duration,
    //         sequelizeModels.Temperature,
    //         sequelizeModels.StateofCharge,
    //         sequelizeModels.Consumption,
    //         sequelizeModels.PanelPower,
    //         sequelizeModels.GPS
    //     ]
    // var modelPromises = []

    // for (var index = 0; index < names.length; index++) {
    //     modelPromises.push(helper.getMostRecent(models[index]))
    // }

    // Promise.all(modelPromises)
    // .then((response) => 
    // {
    //     let json = {}
    //     for (var index = 0; index < names.length; index++)
    //     {
    //         json[names[index]] = response[index]
    //     }
    //     res.json(json)
    // })
    // .catch((err) => {
    //     res.json({ success: false, error: err });
    // })
};
