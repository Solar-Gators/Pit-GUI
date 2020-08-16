/* Dependencies */
var Voltage = require('../models/Voltage')

/** 
    update voltage value
*/
exports.post = (req, res) =>
{
    let { packSumVoltage, LowCellVoltage, highCellVoltage, avgCellVoltage, packSumVoltage } = req.body
    var voltage = new Voltage({
        "LowCellVoltage"  : LowCellVoltage,
        "highCellVoltage" : highCellVoltage,
        "avgCellVoltage"  : avgCellVoltage,
        "packSumVoltage"  : packSumVoltage
    })
    voltage.save()
    res.end()
};

