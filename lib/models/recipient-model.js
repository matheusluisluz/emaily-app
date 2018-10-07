const db = require('../config/db');
const logger = require('../config/winston');
const RECIPIENT_COLLECTION_NAME = 'recipient';

const insertOne = (query, callback) => {
  const survey = db.getCollection(RECIPIENT_COLLECTION_NAME);
  logger.info(`insertOne - ${JSON.stringify(query)}`);
  survey.insertOne(query, callback);
};

const findOne = (query, callback) => {
  const survey = db.getCollection(RECIPIENT_COLLECTION_NAME);
  logger.info(`findOne - ${JSON.stringify(query)}`);
  survey.findOne(query, callback);
};

const findOneAndUpdate = (filter, update, projection, callback) => {
  const survey = db.getCollection(RECIPIENT_COLLECTION_NAME);
  logger.info(`findAndModify - 
  Filter: ${JSON.stringify(filter)} -
  Set: ${JSON.stringify(update)} -
  Projection: ${JSON.stringify(projection)}
  `);
  survey.findOneAndUpdate(filter, update, projection, callback);
};

module.exports = { insertOne, findOne, findOneAndUpdate };
