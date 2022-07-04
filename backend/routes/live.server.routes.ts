
var live = require('../controllers/live.server.controller'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/data')
  .get(live.data);

module.exports = router;