var live = require("../controllers/live.server.controller.js"),
  session = requre("../controllers/session.server.controller.js"),
  express = require("express"), //refers to Express the middleware helper for Node.js
  router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router
  .route("/:id?")
  .get(session.get)
  .post(session.start)
  .put(session.end)
  .delete(session.delete);

module.exports = router;
