'use strict';
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import glob = require("glob")

const env = process.env.NODE_ENV || 'development';
import configs = require("../config/config")
const config = configs[env]
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    operatorsAliases
  }
)
// Add all models
glob(__dirname + "/../shared/models/**/*.js", { nonull: true }, function (er, files) {
  const models = files
    .filter((file) => file !== __dirname + "/index.ts")
    .map(file => require(file).default);
  sequelize.addModels(models)
  sequelize.sync({ alter: true })
})

export default sequelize
