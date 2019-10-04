var path = require('path'),  
    express = require('express'),  //refers to Express the middleware helper for Node.js 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    liveRouter = require('../routes/live.server.routes.js'), 
    graphRouter = require('../routes/graph.server.routes.js');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  //routers
  app.use('/api/live', liveRouter);
  app.use('/api/graph', graphRouter);


  app.all('/*', function(req, res)
  {
   res.sendFile(path.resolve(__dirname + '/../../client/build/index.html'));
  });
  
  return app;
}; 