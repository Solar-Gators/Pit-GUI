
var mitsuba = require('../controllers/mitsuba.server.controller'), 
express = require('express'), //refers to Express the middleware helper for Node.js
router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/')
.post(mitsuba.post)

module.exports = router;
