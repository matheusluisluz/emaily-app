const express = require('express');
const router = new express.Router();
const passport = require('../services/passport');

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/api/current_user', (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

module.exports = router;
