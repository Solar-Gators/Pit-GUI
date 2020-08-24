/* Dependencies */
var models = require('../models')

/**
*   update voltage value
*/
exports.post = async (req, res) =>
{
    let { packSumVoltage, lowCellVoltage, highCellVoltage, avgCellVoltage } = req.body
    await models.Voltage.create({
        "lowCellVoltage"  : lowCellVoltage,
        "highCellVoltage" : highCellVoltage,
        "avgCellVoltage"  : avgCellVoltage,
        "packSumVoltage"  : packSumVoltage
    })
    res.end()
};

