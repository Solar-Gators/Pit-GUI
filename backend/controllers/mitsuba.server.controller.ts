/* Dependencies */
import Mitsuba_RX0 from "../models/Mitsuba/RX0"

/**
*   Update mitsuba rx0
*/
exports.post = async (req, res) =>
{
    console.log(req.body)
    await Mitsuba_RX0.create(req.body)
    
    res.end()
};
