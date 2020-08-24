

exports.getMostRecent = (model) =>
{
    return model.find().sort({"createdAt": -1}).limit(1)
    .then((data) =>
    {
        if (data.length > 0)
            return Promise.resolve(data)
        
        return Promise.resolve(null)
    })

}
