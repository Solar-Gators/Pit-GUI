instance = require("../controllers/instance.server.controller.js");
(express = require("express")), //refers to Express the middleware helper for Node.js
  (router = express.Router()); //refers to the Router() function in Express the middleware helper for Node.js

router
  .route("/:id?")
  .get(instance.get)
  .post(instance.post)
  .delete(instance.delete);
module.exports = router;
