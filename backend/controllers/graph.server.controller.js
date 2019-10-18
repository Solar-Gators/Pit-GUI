/* Dependencies */
var GPS = require('../models/GPS'),
    helper = require('../helper/helper.route')

/* 
    Get the most recent GPS coordinate for the live map
*/
exports.coord = (req, res) =>
{
    helper.getMostRecent(GPS)
    .then((data) => {
        console.log(data)
        res.json({ success: true, data: data });
    })
    .catch((err) =>
    {
        res.json({ success: false, error: err });
    })
};

