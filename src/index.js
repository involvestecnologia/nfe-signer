const debug = require('debug')('nfe-signer:app');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');

debug('bootstrapping application');

const config = require('./config');
const Env = require('./config/env');
const routes = require('./routes/index.routes');

const anyBodyParser = (req, res, next) => {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    req.rawBody = data;
    next();
  });
};

/**
 * @param {Number} [port]
 * @return {Promise.<*>} fastify instance
 */
module.exports = (port) => {
  const app = express();

  app.use(helmet());
  app.use(morgan(Env.HTTP_LOG_CONFIG, { stream: config.logger.stream }));
  app.use(cors());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
  app.use(anyBodyParser);
  app.use(compression());
  app.use(passport.initialize());
  app.use(routes);

  const listen = () => new Promise((resolve, reject) => {
    port = port || Env.PORT;

    const server = app.listen(port, (err) => {
      /* istanbul ignore next */
      if (err) return reject(err);
      resolve(server);
    });
  });

  return listen();
};
