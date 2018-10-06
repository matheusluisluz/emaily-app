const express = require('express');
const router = new express.Router();
const userService = require('../services/users-service');
const logger = require('../config/winston');
const requireLogin = require('../middlewares/require-login');

const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);

router.post('/api/stripe', requireLogin, async (req, res) => {  

  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id
  });

  req.user.credits += 5;

  userService.updateCredits(req.user.googleId, req.user.credits, (err, result) => {
    if (err) {
      logger.error(`Found user - ${JSON.stringify(err)}`);
      return;
    }
    logger.error(`Updated Credits - ${JSON.stringify(result.value)}`);
    return res.send(result.value);
  });
});

module.exports = router;
