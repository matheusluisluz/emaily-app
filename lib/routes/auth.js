const express = require('express');
const router = new express.Router();
const passport = require('../services/passport');

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/auth/google/callback', passport.authenticate('google'));

module.exports = router;
