(car = require("../controllers/car.server.controller.js")),
  (express = require("express")), //refers to Express the middleware helper for Node.js
  (router = express.Router()); //refers to the Router() function in Express the middleware helper for Node.js

router.route("/:id?").get(car.get).post(car.post).delete(car.delete);
module.exports = router;
