
import * as express from "express"
import PowerBoard_RX0 from "../shared/models/PowerBoard/RX0";
import PowerBoard_RX1 from "../shared/models/PowerBoard/RX1";
import { configureREST } from "../helper/helper.route"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

configureREST({
    router,
    endPoints: [{
        model: PowerBoard_RX0,
        path: 'rx0'
    },{
        model: PowerBoard_RX1,
        path: 'rx1'
    }]
})

export default router
