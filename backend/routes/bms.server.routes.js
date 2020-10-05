
var bms = require('../controllers/bms.server.controller.js'), 
express = require('express'), //refers to Express the middleware helper for Node.js
router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/')
.post(bms.post)

module.exports = router;
