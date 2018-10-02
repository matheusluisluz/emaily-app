const express = require('express');
const router = new express.Router();

const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);

router.post('/api/stripe', async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id
  });

  console.log(charge);
});

module.exports = router;
