/* Dependencies */
import GPS from "../models/GPS/GPS"
import getMostRecent from "../helper/helper.route"

/**
*   Get the most recent GPS coordinate for the live map
*/
exports.coord = (req, res) =>
{
    getMostRecent(GPS)
    .then((data) => {
        res.json({ success: true, data: data });
    })
    .catch((err) =>
    {
        res.json({ success: false, error: err });
    })
};

