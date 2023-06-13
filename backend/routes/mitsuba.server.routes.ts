
import * as express from "express"
import Mitsuba_RX0 from "../shared/models/Mitsuba/RX0";
import Mitsuba_RX1 from "../shared/models/Mitsuba/RX1";
import Mitsuba_RX2 from "../shared/models/Mitsuba/RX2";
import DistanceTraveled from "../shared/models/Stats/DistanceTraveled";
import { rx0Middleware } from "../controllers/mitsuba.server.controller";
import { configureREST } from "../helper/helper.route"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

configureREST({
    router,
    endPoints: [{
        model: Mitsuba_RX0,
        path: 'rx0',
        postMiddleware: rx0Middleware,
    }, {
        model: Mitsuba_RX1,
        path: 'rx1'
    }, {
        model: Mitsuba_RX2,
        path: 'rx2'
    },{
        model: DistanceTraveled,
        path: 'distance_traveled'
    }]
})

export default router
