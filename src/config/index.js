const debug = require('debug')('github-metrics:config');

debug('loading app configuration');

require('./promise');
require('./passport');

module.exports = {
  Env: require('./env'),
  logger: require('./logger'),
};
