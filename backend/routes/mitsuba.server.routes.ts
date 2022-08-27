
import * as express from "express"
import Mitsuba_RX0 from "../shared/models/Mitsuba/RX0";
import Mitsuba_RX1 from "../shared/models/Mitsuba/RX1";
import Mitsuba_RX2 from "../shared/models/Mitsuba/RX2";
import { configureREST } from "../helper/helper.route"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

configureREST({
    router,
    endPoints: [{
        model:Mitsuba_RX0,
        path: 'rx0'
    }, {
        model: Mitsuba_RX1,
        path: 'rx1'
    }, {
        model: Mitsuba_RX2,
        path: 'rx2'
    }]
})

export default router
