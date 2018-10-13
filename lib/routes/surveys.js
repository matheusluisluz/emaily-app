const express = require('express');
const router = new express.Router();
const requireLogin = require('../middlewares/require-login');
const requireCredits = require('../middlewares/require-credits');
const surveyService = require('../services/surveys-service');
const userService = require('../services/users-service');
const recipientService = require('../services/recipients-service');
const logger = require('../config/winston');

router.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
  const { title, subject, body, recipients } = req.body;
  const id = req.user._id;
  recipientService.createRecipient(recipients, false, (err) => {
    // const recipient = result.ops[0];
    if (err) {
      logger.error(`Create Recipient - ${JSON.stringify(err)}`);
      return;
    }
    surveyService.createSurvey(id, title, subject, body, recipients, (err) => {
      if (err) {
        logger.error(`Create survey - ${JSON.stringify(err)}`);
        return;
      }
      req.user.credits -= 1;
      userService.updateCredits(req.user.googleId, req.user.credits, (err, userUpdated) => {
        if (err) {
          logger.error(`Found user - ${JSON.stringify(err)}`);
          return;
        }
        logger.info(`Updated Credits - ${JSON.stringify(userUpdated.value)}`);
        return res.send(userUpdated.value);
      });
    });
  });

});

router.get('/api/surveys/thanks', (req, res) => {
  res.send('Thanks for voting!');
});

module.exports = router;
//TODO recipientId into survey
