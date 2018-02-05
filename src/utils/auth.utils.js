const crypto = require('crypto');

/**
 * @module AuthUtils
 */
const AuthUtils = {
  /**
   * @param username
   * @param password
   * @param [algorithm = 'md5']
   * @param [salt = '']
   * @return {String}
   */
  encrypt: (username, password, algorithm = 'md5', salt = '') => {
    const authString = Buffer.from(`${username}:${password}${salt}`, 'utf8').toString('base64');

    return crypto
      .createHash(algorithm)
      .update(authString)
      .digest('hex')
      .toUpperCase();
  },
};

module.exports = AuthUtils;
