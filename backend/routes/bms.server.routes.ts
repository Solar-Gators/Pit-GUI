import * as express from "express"
import BMS_RX0 from "../shared/models/BMS/RX0";
import BMS_RX1 from "../shared/models/BMS/RX1";
import BMS_RX2 from "../shared/models/BMS/RX2";
import BMS_RX3 from "../shared/models/BMS/RX3";
import BMS_RX4 from "../shared/models/BMS/RX4";
import BMS_RX5 from "../shared/models/BMS/RX5";
import connection from "../models";
import { ModelRestApi } from 'sx-sequelize-api';

const router = express.Router();

const RX0Api = new ModelRestApi(BMS_RX0, connection)
const RX1Api = new ModelRestApi(BMS_RX1, connection)
const RX2Api = new ModelRestApi(BMS_RX2, connection)
const RX3Api = new ModelRestApi(BMS_RX3, connection)
const RX4Api = new ModelRestApi(BMS_RX4, connection)
const RX5Api = new ModelRestApi(BMS_RX5, connection)


router.route('/rx0')
    .post(RX0Api.create())
router.route('/rx1')
    .post(RX1Api.create())
router.route('/rx2')
    .post(RX2Api.create())
router.route('/rx3')
    .post(RX3Api.create())
router.route('/rx4')
    .post(RX4Api.create())
router.route('/rx5')
    .post(RX5Api.create())

export default router;
