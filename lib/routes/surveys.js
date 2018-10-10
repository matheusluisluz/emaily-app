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
  const id = req.user.id;

  surveyService.createSurvey(id, title, subject, body, recipients, (err, result) => {
    if (err) {
      logger.error(`Create survey - ${JSON.stringify(err)}`);
      return;
    }
    // logger.error(`Updated Credits - ${JSON.stringify(result.value)}`);
    // return res.send(result.value);
    req.user.credits -= 1;
    userService.updateCredits(req.user.googleId, req.user.credits, (err, result) => {
      if (err) {
        logger.error(`Found user - ${JSON.stringify(err)}`);
        return;
      }
      logger.info(`Updated Credits - ${JSON.stringify(result.value)}`);
      return res.send(result.value);
    });
  });
});

module.exports = router;

//TODO create survey then update the user