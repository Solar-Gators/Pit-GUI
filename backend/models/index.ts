'use strict';
import { Sequelize } from 'sequelize-typescript'
import glob = require("glob")

const env = process.env.NODE_ENV || 'development';
import configs from "../config/config"
const config = configs[env]


export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)
// Add all models
glob(__dirname + "/../shared/models/**/*.js", { nonull: true }, function (er, files) {
  const models = files
    .filter((file) => file !== __dirname + "/index.ts")
    .map(file => require(file).default);
  sequelize.addModels(models)
  sequelize.sync()
})

export default sequelize
