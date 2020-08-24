var mongoose = require('mongoose'),
    config = require('../config/config')

exports.mongodb = () =>
{
    mongoose.connect(config.db.uri, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
}
