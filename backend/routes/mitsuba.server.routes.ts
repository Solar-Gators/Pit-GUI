
import * as express from "express"
import Mitsuba_RX0 from "../models/Mitsuba/RX0";
import Mitsuba_RX1 from "../models/Mitsuba/RX1";
import Mitsuba_RX2 from "../models/Mitsuba/RX2";
import connection from "../models";
import { ModelRestApi } from 'sx-sequelize-api';
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

const RX0Api = new ModelRestApi(Mitsuba_RX0, connection)
const RX1Api = new ModelRestApi(Mitsuba_RX1, connection)
const RX2Api = new ModelRestApi(Mitsuba_RX2, connection)


router.route('/rx0')
    .post(RX0Api.create())
router.route('/rx1')
    .post(RX1Api.create())
router.route('/rx2')
    .post(RX2Api.create())

export default router
