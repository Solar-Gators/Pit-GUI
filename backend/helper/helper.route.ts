import { Router } from 'express'
import { Model } from 'sequelize'
import connection from "../models";
import { ModelRestApi } from 'sx-sequelize-api'

class CustomModel extends Model {}

/**
 * Gets most recent entry when given a sequelize model
 *
 * @param {SequlizeModel} model
 */
export function getMostRecent(model: typeof CustomModel) {
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


export function configureREST({ router, endPoints }: { router: Router, endPoints: {
    model: typeof CustomModel,
    path: string
}[] }) {
    endPoints.forEach(item => {
        const api = new ModelRestApi(item.model, connection)
        router.route(`/${item.path}`)
            .post(api.create())
            .get(api.getAll())

        router.route(`/${item.path}/cnt`)
            .get(api.count())
    });
}
