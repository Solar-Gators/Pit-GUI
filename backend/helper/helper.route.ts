import { Model } from 'sequelize'

class CustomModel extends Model {}

/**
 * Gets most recent entry when given a sequelize model
 * 
 * @param {SequlizeModel} model 
 */
export default function getMostRecent(model: typeof CustomModel) {
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
