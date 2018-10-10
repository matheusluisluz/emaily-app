const surveyModels = require('../models/survey-model');
const logger = require('../config/winston');
const Mailer = require('../clients/Mailer');
const template = require('../clients/templates/survey-templates');

const createSurvey = async (id, title, subject, body, recipients, callback) => {
  const survey = {
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: id,
    dataSent: new Date()
  };

  const mailer = new Mailer(survey, template(survey));
  await mailer.send();

  logger.info(`createSurvey - ${JSON.stringify(survey)}`);
  surveyModels.insertOne(survey, callback);
};

module.exports = { createSurvey };
