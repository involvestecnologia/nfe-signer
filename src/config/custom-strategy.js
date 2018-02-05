const { Strategy: PassportStrategy } = require('passport-strategy');

/**
 * `CustomBasicStrategy` constructor.
 *
 * The HTTP Custom Basic authentication strategy authenticates requests based on
 * userid and password credentials contained in the `Authorization` header
 * field.
 *
 * Applications must supply a `verify` callback which accepts the encrypted `credentials`,
 * and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occured, `err` should be set.
 *
 * Optionally, `options` can be used to change the authentication realm.
 *
 * Options:
 *   - `realm`  authentication realm, defaults to "Users"
 *
 * Examples:
 *
 *     passport.use(new CustomBasicStrategy((credentials, done) => {
 *       const valid = process.env.CREDENTIALS === credentials;
 *
 *       done(err, valid);
 *     }));
 */
class CustomBasicStrategy extends PassportStrategy {
  constructor(options, verify) {
    super();

    if (typeof options === 'function') {
      verify = options;
      options = {};
    }
    if (!verify) throw new Error('HTTP Basic authentication strategy requires a verify function');

    this.name = 'basic-custom';
    this._verify = verify;
    this._realm = options.realm || 'Users';
    this._passReqToCallback = options.passReqToCallback;
  }

  /**
   * @override
   */
  authenticate(req) {
    const { authorization } = req.headers;
    if (!authorization) return this.fail(this._challenge());

    const parts = authorization.split(' ');
    if (parts.length < 2) return this.fail(400);

    const scheme = parts[0];
    const credentials = parts[1];

    if (!/Basic/i.test(scheme)) return this.fail(this._challenge());
    if (!credentials || !credentials.length) return this.fail(400);

    const self = this;

    const verified = (err, user) => {
      if (err) return self.error(err);
      if (!user) return self.fail(self._challenge());

      self.success(user);
    };

    const args = [];
    if (self._passReqToCallback) args.push(req);
    args.push(credentials);
    args.push(verified);

    this._verify(...args);
  }

  _challenge() {
    return `Basic realm="${this._realm}"`;
  }
}

module.exports = CustomBasicStrategy;
