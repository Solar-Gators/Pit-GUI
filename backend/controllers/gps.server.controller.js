/* Dependencies */
var models = require('../models')

/**
*   update voltage value
*/
exports.post = async (req, res) =>
{
    let { heading, latitude, longitude, speed } = req.body

    await models.GPS.create({
        heading: heading,
        latitude: latitude,
        longitude: longitude,
        speed: speed
    })
    
    res.end()
};

