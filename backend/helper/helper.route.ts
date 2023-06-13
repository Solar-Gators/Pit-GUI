import { NextFunction, Response, Router, Request } from 'express'
import { ModelStatic, Model } from 'sequelize'
import { WhereOptions } from 'sequelize'
import connection from "../models";
import { ModelRestApi } from 'sx-sequelize-api'

class CustomModel extends Model {}

/**
 * Gets most recent entry when given a sequelize model
 *
 * @param {SequlizeModel} model
 */
export function getMostRecent<T extends Model>(
    model: ModelStatic<T>,
    where: WhereOptions<T['_attributes']> = {}
) {
    return model.findOne({
        where,
        order: [ [ 'createdAt', 'DESC' ]]
    })
}


export function configureREST({ router, endPoints }: { router: Router, endPoints: {
    model: ModelStatic<CustomModel>,
    path: string,
    postMiddleware?: (req: Request, res: Response, next: NextFunction) => any
}[] }) {
    endPoints.forEach(item => {
        const api = new ModelRestApi(item.model, connection)

        const baseRoute = router.route(`/${item.path}`)


        baseRoute.get(api.getAll())


        if (item?.postMiddleware) {
            baseRoute.post(item.postMiddleware)
        }

        baseRoute.post(api.create())

        router.route(`/${item.path}/cnt`)
            .get(api.count())


        const attributes = item.model.getAttributes()
        for (const attribute in attributes) {
            router.route(`/${item.path}/item/${attribute}`)
            .get(api.getAll(
                Object.keys(attributes).filter((value) => ![attribute, "id", "createdAt", "updatedAt"].includes(value))
            ))
        }
    });
}
