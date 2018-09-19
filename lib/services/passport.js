const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const logger = require('../config/winston');
const userService = require('../services/users-service');

// const init = () => {
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
    (accessToken, refreshToken, profile, done) => {
      userService.createUser(profile, (err, result) => {
        if (result) {
          return done(err, 200, { scope: 'all' });
        }
        logger.error(err);
        done(err, false);
      });
    })
  );
// }

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
