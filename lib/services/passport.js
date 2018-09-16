const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const logger = require('../config/winston');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        logger.info('access token', accessToken);
        logger.info('refresh token', refreshToken);
        logger.info('profile: ', profile);
    })
);

module.exports = passport;
