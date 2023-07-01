import * as express from "express"
import LapCount from "../shared/models/Stats/LapCount";

import { configureREST } from "../helper/helper.route"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

configureREST({
    router,
    endPoints: [{
        model: LapCount,
        path: 'rx0'
    }]
})

export default router
