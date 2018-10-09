const surveyModels = require('../models/survey-model');
const logger = require('../config/winston');
const Mailer = require('../clients/Mailer');

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

  // sendGrid.mailer(survey);
  const template = `<div>${survey.body}</div>`;
  const mailer = new Mailer(survey, template);
  mailer.send();

};

module.exports = { createSurvey };
