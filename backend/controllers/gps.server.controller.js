/* Dependencies */
var GPS = require('../models/GPS')

/* 
    update voltage value
*/
exports.post = (req, res) =>
{
    var gps = new GPS({
        "heading" : req.body.heading,
    "coordinates" : {
        "latitude" : req.body.latitude,
        "longitude" : req.body.longitude
      },
    "speed" : req.body.speed
    });
    gps.save()
    res.end()
};

