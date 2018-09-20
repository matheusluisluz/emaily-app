const db = require('../config/db');
const logger = require('../config/winston');
const USER_COLLECTION_NAME = 'user';

const insertOne = (query, callback) => {
  const user = db.getCollection(USER_COLLECTION_NAME);
  logger.info(`insertOne - ${JSON.stringify(query)}`);
  user.insertOne(query, callback);
};

const findOne = (query, callback) => {
  const config = db.getCollection(USER_COLLECTION_NAME);
  logger.info(`findOne - ${JSON.stringify(query)}`);
  config.findOne(query, callback);
};

module.exports = { insertOne, findOne };
