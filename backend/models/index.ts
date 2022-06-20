'use strict';
import { Sequelize } from 'sequelize-typescript'

import GPS from './GPS/GPS';
import Mitsuba_RX0 from './Mitsuba/RX0';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

sequelize.addModels([
  GPS,
  Mitsuba_RX0
])
