
import * as express from "express"
import MPPT_RX0 from "../shared/models/MPPT/RX0";
import MPPT_RX1 from "../shared/models/MPPT/RX1";
import MPPT_RX2 from "../shared/models/MPPT/RX2";
import MPPT_RX3 from "../shared/models/MPPT/RX3";
import MPPT_RX4 from "../shared/models/MPPT/RX4";
import MPPT_RX5 from "../shared/models/MPPT/RX5";
import { configureREST } from "../helper/helper.route"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

configureREST({
    router,
    endPoints: [{
        model: MPPT_RX0,
        path: 'rx0'
    }, {
        model: MPPT_RX1,
        path: 'rx1'
    }, {
        model: MPPT_RX2,
        path: 'rx2'
    },{
        model: MPPT_RX3,
        path: 'rx3'
    },{
        model: MPPT_RX4,
        path: 'rx4'
    },
    {
        model: MPPT_RX5,
        path: 'rx5'
    }]
})

export default router
