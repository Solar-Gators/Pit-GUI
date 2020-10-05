var express = require('express'),  //refers to Express the middleware helper for Node.js 
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    liveRouter = require('../routes/live.server.routes.js'), 
    graphRouter = require('../routes/graph.server.routes.js'),
    bms = require('../routes/bms.server.routes.js'),
    gps = require('../routes/gps.server.routes.js')

module.exports.init = function() {
  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  //routers
  app.use('/api/live', liveRouter);
  app.use('/api/graph', graphRouter);
  app.use('/api/bms', bms);
  app.use('/api/gps', gps);


  // app.all('/*', function(req, res)
  // {
  //  res.sendFile(path.resolve(__dirname + '/../../client/build/index.html'));
  // });
  
  return app;
}; 