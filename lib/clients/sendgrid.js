const sendGrid = require('@sendgrid/mail');
const key = require('../config/key');

const mailer = survey => {

  const template = `<div>${survey.body}</div>`;

  sendGrid.setApiKey(key.sendGridKey);
  const msg = {
    to: survey.recipients,
    from: 'no-reply@emaily.com',
    subject: survey.subject,
    text: 'and easy to do anywhere, even with Node.js',
    html: template
  };

  sendGrid.send(msg);

};

module.exports = { mailer };
