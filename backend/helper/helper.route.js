
/**
 * Gets most recent entry when given a sequelize model
 * 
 * @param {SequlizeModel} model 
 */
exports.getMostRecent = (model) =>
{
    return model.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
    })
    .then((data) =>
    {
        if (data.length > 0)
            return Promise.resolve(data[0])
        
        return Promise.resolve(null)
    })

}
