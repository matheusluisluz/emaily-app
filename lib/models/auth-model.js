const db = require('../config/db');
const logger = require('../config/winston');
const USER_COLLECTION_NAME = 'user';

const insertOne = (query, callback) => {
  const user = db.getCollection(USER_COLLECTION_NAME);
  logger.info(`insertOne - ${JSON.stringify(query)}`);
  user.insertOne(query, callback);
};

const findOne = (query, callback) => {
  const user = db.getCollection(USER_COLLECTION_NAME);
  logger.info(`findOne - ${JSON.stringify(query)}`);
  user.findOne(query, callback);
};

const findOneAndUpdate = (filter, update, projection, callback) => {
  const user = db.getCollection(USER_COLLECTION_NAME);
  logger.info(`findAndModify - 
  Filter: ${JSON.stringify(filter)} -
  Set: ${JSON.stringify(update)} -
  Projection: ${JSON.stringify(projection)}
  `);
  user.findOneAndUpdate(filter, update, projection, callback);
};

module.exports = { insertOne, findOne, findOneAndUpdate };
