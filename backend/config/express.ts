var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    liveRouter = require('../routes/live.server.routes.js')
import * as express from "express"
import sequelize from "../models"
import mitsuba from '../routes/mitsuba.server.routes'
import bms from '../routes/bms.server.routes'
import mppt from '../routes/mppt.server.routes'
import gps from '../routes/gps.server.routes'
import laps from '../routes/laps.server.routes'
const cors = require('cors')

module.exports.init = async () => {
  //initialize app
  var app = express();

  // Allow all origins
  app.use(cors({
    origin: '*'
  }))

  await sequelize.sync({ alter: true })

  //enable request logging for development debugging
  //app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  //routers
  app.use('/api/live', liveRouter);
  app.use('/api/bms', bms);
  app.use('/api/gps', gps);
  app.use('/api/mitsuba', mitsuba);
  app.use('/api/mppt', mppt);
  app.use('/api/laps', laps);

  return app;
};
