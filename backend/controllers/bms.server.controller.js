/* Dependencies */
var Voltage = require('../models/Voltage')

/* 
    update voltage value
*/
exports.post = (req, res) =>
{
    var voltage = new Voltage({
        "Voltage" : req.body.packSumVoltage
    })
    voltage.save()
    console.log(req.body)
    res.end()
};

