const MongoClient = require('mongodb').MongoClient;
const logger = require('./winston');
const keys = require('../config/key');

const Database = {};
const collections = [];
let client;

Database.connect = (uri, callback) => {
  logger.debug('Database trying to connect.');
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, _db) => {
    if (err) {
      logger.error(`Database failed to connect. - ${err.message}`);
    } else {
      logger.info('Database connected.');
      client = _db;
    }
    return callback(err, client);
  });
};

Database.getCollection = (collectionName) => {
  let collection = collections[collectionName];

  if (!collection) {
    collection = client.db(keys.dbName).collection(collectionName);
    collections[collectionName] = collection;
  }

  return collection;
};

Database.close = (callback) => {
  logger.debug('Database trying to disconnect');
  if (client) {
    client.close((err) => {
      if (err) {
        logger.error('Error on closing database');
      } else {
        logger.info('Database disconnected');
      }
      callback(err);
    });
  }
};

module.exports = Database;
