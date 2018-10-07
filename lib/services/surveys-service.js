const surveyModels = require('../models/survey-model');
const logger = require('../config/winston');

const createSurvey = (id, title, subject, body, recipients, callback) => {
  const query = {
    title,
    subject,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: id,
    dataSent: new Date()
  };

  logger.info(`createSurvey - ${JSON.stringify(query)}`);
  surveyModels.insertOne(query, callback);
};

module.exports = { createSurvey };
