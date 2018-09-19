const db = require('../config/db');
const logger = require('../config/winston');
const USER_COLLECTION_NAME = 'user';

const insert = (query, callback) => {
  const user = db.getCollection(USER_COLLECTION_NAME);
  console.log('createUser: ' + query);
  user.insertOne(query, callback);
};

module.exports = { insert };
