
import * as express from "express"
import GPS from "../shared/models/GPS/GPS";
import { configureREST } from "../helper/helper.route"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

configureREST({
    router,
    endPoints: [{
        model: GPS,
        path: 'rx0'
    }]
})

export default router
