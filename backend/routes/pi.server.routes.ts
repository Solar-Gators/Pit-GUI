import * as express from "express"
import Alive from "../shared/models/PI/Alive";
import { configureREST } from "../helper/helper.route"
const router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

configureREST({
    router,
    endPoints: [{
        model: Alive,
        path: 'alive'
    }]
})

export default router
