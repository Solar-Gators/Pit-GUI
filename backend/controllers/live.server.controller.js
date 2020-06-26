/* Dependencies */
var Speed = require('../models/Speed'),
    Voltage = require('../models/Voltage'),
    Duration = require('../models/Duration'),
    Temperature = require('../models/Temperature'),
    StateofCharge = require('../models/StateofCharge'),
    Consumption = require('../models/Consumption'),
    PanelPower = require('../models/PanelPower'),
    GPS = require('../models/GPS'),
    helper = require('../helper/helper.route')

/* 
    Return data for the sensor read outs on the live tab
*/
exports.data = (req, res) =>
{
    var names = ["speed", "voltage", "duration", "temperature", "stateofCharge", "consumption", "panelPower", "gps"]
    var models = [Speed, Voltage, Duration, Temperature, StateofCharge, Consumption, PanelPower, GPS]
    var modelPromises = []

    for (var index = 0; index < names.length; index++)
        modelPromises.push(helper.getMostRecent(models[index]))

    Promise.all(modelPromises)
    .then((response) => 
    {
        let json = {}
        for (var index = 0; index < names.length; index++)
        {
            json[names[index]] = response[index]
        }
        res.json(json)
    })
};
