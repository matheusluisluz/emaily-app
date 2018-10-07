const surveyModels = require('../models/survey-model');
const logger = require('../config/winston');
const sendGrid = require('../clients/sendgrid')

const createSurvey = (id, title, subject, body, recipients, callback) => {
  const survey = {
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: id,
    dataSent: new Date()
  };

  logger.info(`createSurvey - ${JSON.stringify(survey)}`);
  surveyModels.insertOne(survey, callback);

  sendGrid.mailer(survey);

};

module.exports = { createSurvey };
