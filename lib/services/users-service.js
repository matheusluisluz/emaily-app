const authModels = require('../models/auth-model');
const logger = require('../config/winston');

const createUser = (body, callback) => {
  const query = {};
  query.googleId = body.id;

  logger.info(`createUser - ${JSON.stringify(query)}`);
  authModels.insertOne(query, callback);
};

const findById = (id, callback) => {

  const query = {
    googleId: id
  };

  authModels.findOne(query, (err, user) => {
    if (err) {
      logger.error(`Database error findOne: ${JSON.stringify(err)}`);
      return callback(err);
    }
    return callback(null, user);
  });
};

module.exports = { createUser, findById };
