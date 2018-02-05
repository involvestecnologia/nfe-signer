require('dotenv').load();

class Env {
  /**
   * @return {string}
   * @constructor
   */
  static get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  }

  /**
   * @param {string} value
   * @constructor
   */
  static set NODE_ENV(value) {
    process.env.NODE_ENV = value;
  }

  /**
   * @return {number}
   * @constructor
   */
  static get PORT() {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }

  /**
   * @param {number} value
   * @constructor
   */
  static set PORT(value) {
    process.env.PORT = value;
  }

  /**
   * @return {string}
   * @constructor
   */
  static get HTTP_LOG_CONFIG() {
    return process.env.HTTP_LOG_CONFIG || 'dev';
  }

  /**
   * @param {string} value
   * @constructor
   */
  static set HTTP_LOG_CONFIG(value) {
    process.env.HTTP_LOG_CONFIG = value;
  }

  /**
   * @param {string} value NFSP-e client_id
   * @constructor
   */
  static set NFPS_E_CLIENT_ID(value) {
    process.env.NFPS_E_CLIENT_ID = value;
  }

  /**
   * @return {string} NFSP-e client_id
   * @constructor
   */
  static get NFPS_E_CLIENT_ID() {
    return process.env.NFPS_E_CLIENT_ID;
  }

  /**
   * @param {string} value NFSP-e client_secret
   * @constructor
   */
  static set NFPS_E_CLIENT_SECRET(value) {
    process.env.NFPS_E_CLIENT_SECRET = value;
  }

  /**
   * @return {string} NFSP-e client_secret
   * @constructor
   */
  static get NFPS_E_CLIENT_SECRET() {
    return process.env.NFPS_E_CLIENT_SECRET;
  }

  /**
   * @param {string} value NFSP-e username
   * @constructor
   */
  static set NFPS_E_USERNAME(value) {
    process.env.NFPS_E_USERNAME = value;
  }

  /**
   * @return {string} NFSP-e username
   * @constructor
   */
  static get NFPS_E_USERNAME() {
    return process.env.NFPS_E_USERNAME;
  }

  /**
   * @param {string} value NFSP-e password
   * @constructor
   */
  static set NFPS_E_PASSWORD(value) {
    process.env.NFPS_E_PASSWORD = value;
  }

  /**
   * @return {string} NFSP-e password
   * @constructor
   */
  static get NFPS_E_PASSWORD() {
    return process.env.NFPS_E_PASSWORD;
  }

  /**
   * @param {string} value NFSP-e CMC
   * @constructor
   */
  static set NFPS_E_CMC(value) {
    process.env.NFPS_E_CMC = value;
  }

  /**
   * @return {string} NFSP-e CMC
   * @constructor
   */
  static get NFPS_E_CMC() {
    return process.env.NFPS_E_CMC;
  }

  /**
   * @return {String} Certificate path
   * @constructor
   */
  static get CERTIFICATE_PATH() {
    return process.env.CERTIFICATE_PATH;
  }

  /**
   * @param {String} value Certificate path
   * @constructor
   */
  static set CERTIFICATE_PATH(value) {
    process.env.CERTIFICATE_PATH = value;
  }

  /**
   * @return {String} Key path
   * @constructor
   */
  static get KEY_PATH() {
    return process.env.KEY_PATH;
  }

  /**
   * @param {String} value Key path
   * @constructor
   */
  static set KEY_PATH(value) {
    process.env.KEY_PATH = value;
  }

  /**
   * @return {String} Basic auth username
   * @constructor
   */
  static get BASIC_USERNAME() {
    return process.env.BASIC_USERNAME;
  }

  /**
   * @param {String} value Basic auth username
   * @constructor
   */
  static set BASIC_USERNAME(value) {
    process.env.BASIC_USERNAME = value;
  }

  /**
   * @return {String} Basic auth password
   * @constructor
   */
  static get BASIC_PASSWORD() {
    return process.env.BASIC_PASSWORD;
  }

  /**
   * @param {String} value Basic auth password
   * @constructor
   */
  static set BASIC_PASSWORD(value) {
    process.env.BASIC_PASSWORD = value;
  }

  /**
   * @return {String} Graylog server host
   * @constructor
   */
  static get GRAYLOG_SERVER_HOST() {
    return process.env.GRAYLOG_SERVER_HOST;
  }

  /**
   * @param {String} value Graylog server host
   * @constructor
   */
  static set GRAYLOG_SERVER_HOST(value) {
    process.env.GRAYLOG_SERVER_HOST = value;
  }

  /**
   * @return {String} Graylog server port
   * @constructor
   */
  static get GRAYLOG_SERVER_PORT() {
    return process.env.GRAYLOG_SERVER_PORT;
  }

  /**
   * @param {String} value Graylog server port
   * @constructor
   */
  static set GRAYLOG_SERVER_PORT(value) {
    process.env.GRAYLOG_SERVER_PORT = value;
  }

  /**
   * @return {String} Graylog hostname
   * @constructor
   */
  static get GRAYLOG_HOSTNAME() {
    return process.env.GRAYLOG_HOSTNAME;
  }

  /**
   * @param {String} value Graylog server host
   * @constructor
   */
  static set GRAYLOG_HOSTNAME(value) {
    process.env.GRAYLOG_HOSTNAME = value;
  }
}

module.exports = Env;
