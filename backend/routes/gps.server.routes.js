
var gps = require('../controllers/gps.server.controller'), 
express = require('express'), //refers to Express the middleware helper for Node.js
router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/')
.post(gps.post)

module.exports = router;
