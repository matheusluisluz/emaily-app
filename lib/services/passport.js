const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const logger = require('../config/winston');
const userService = require('../services/users-service');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userService.findById(id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    userService.findById(profile.id, (err, existingUser) => {
      if (existingUser) {
        logger.info(`Found user - ${JSON.stringify(existingUser)}`);
        done(null, existingUser);
      } else {
        userService.createUser(profile, (err, result) => {
          if (result) {
            return done(err, 200, { scope: 'all' });
          }
          logger.error(err);
          done(err, false);
        });
      }
    });

  })
);

module.exports = passport;
