/* Dependencies */
var GPS = require('../models/GPS'),
    helper = require('../helper/helper.route')

/* Create a listing */
exports.info = (req, res) =>
{
    helper.getMostRecent(GPS, res)
};

