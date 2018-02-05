const Env = require('./env');
const passport = require('passport');
const CustomBasicStrategy = require('./custom-strategy');
const AuthUtils = require('../utils/auth.utils');

const ENCRYPTED_BASIC_CREDENTIALS = AuthUtils.encrypt(Env.BASIC_USERNAME, Env.BASIC_PASSWORD);

passport.use('basic', new CustomBasicStrategy((credentials, done) => {
  done(null, ENCRYPTED_BASIC_CREDENTIALS === credentials);
}));
