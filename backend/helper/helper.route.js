

exports.getMostRecent = (model, res) =>
{
    model.find((err, data) =>
    {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data[0] });
    }).sort({"createdAt": -1}).limit(1);
}
