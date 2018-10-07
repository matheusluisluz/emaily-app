const recipientModels = require('../models/recipient-model');
const logger = require('../config/winston');

const createRecipient = (email, responded, callback) => {
  const query = {
    email,
    responded
  };

  logger.info(`createRecipient - ${JSON.stringify(query)}`);
  recipientModels.insertOne(query, callback);
};

module.exports = { createRecipient };
