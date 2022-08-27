import * as express from "express"
import BMS_RX0 from "../shared/models/BMS/RX0";
import BMS_RX1 from "../shared/models/BMS/RX1";
import BMS_RX2 from "../shared/models/BMS/RX2";
import BMS_RX3 from "../shared/models/BMS/RX3";
import BMS_RX4 from "../shared/models/BMS/RX4";
import BMS_RX5 from "../shared/models/BMS/RX5";
import { configureREST } from "../helper/helper.route";
const router = express.Router();

configureREST({
    router,
    endPoints: [{
        model: BMS_RX0,
        path: 'rx0'
    },{
        model: BMS_RX1,
        path: 'rx1'
    },{
        model: BMS_RX2,
        path: 'rx2'
    },{
        model: BMS_RX3,
        path: 'rx3'
    },{
        model: BMS_RX4,
        path: 'rx4'
    },{
        model: BMS_RX5,
        path: 'rx5'
    },]
})

export default router;
