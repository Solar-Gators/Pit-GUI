/* Dependencies */
var Speed = require('../models-mongo/Speed'),
    Voltage = require('../models-mongo/Voltage'),
    Duration = require('../models-mongo/Duration'),
    Temperature = require('../models-mongo/Temperature'),
    StateofCharge = require('../models-mongo/StateofCharge'),
    Consumption = require('../models-mongo/Consumption'),
    PanelPower = require('../models-mongo/PanelPower'),
    GPS = require('../models-mongo/GPS'),
    helper = require('../helper/helper.route')

/**
    Return data for the sensor read outs on the live tab
*/
exports.data = (req, res) =>
{
    var names = [
        "speed",
        "voltage",
        "duration",
        "temperature",
        "stateofCharge",
        "consumption",
        "panelPower",
        "gps"
    ]
    var models = [
                Speed,
                Voltage,
                Duration,
                Temperature,
                StateofCharge,
                Consumption,
                PanelPower,
                GPS]
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
