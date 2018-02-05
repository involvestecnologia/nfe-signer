const debug = require('debug')('github-metrics:config:logger');
const os = require('os');
const path = require('path');
const makeDir = require('make-dir');
const split = require('split');
const winston = require('winston');
const WinstonGraylog2 = require('winston-graylog2');
const Env = require('./env');

debug('configuring logger');

const pkg = require('../../package.json');

winston.emitErrs = true;

const logDirectory = path.join(os.homedir(), `.${pkg.name}/logs`);
makeDir.sync(logDirectory);

const logger = new winston.Logger({
  transports: [
    new WinstonGraylog2({
      name: 'graylog',
      level: 'info',
      graylog: {
        servers: [{
          host: Env.GRAYLOG_SERVER_HOST,
          port: Env.GRAYLOG_SERVER_PORT,
        }],
        facility: 'nfe-signer',
      },
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = split().on('data', (message) => {
  logger.info(message);
});
