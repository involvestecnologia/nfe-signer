const debug = require('debug')('nfe-signer:routes:index');
const express = require('express');
const passpord = require('passport');

debug('configuring routes');

const GeneralMiddleware = require('../middlewares/general.middleware');
const ErrorsMiddleware = require('../middlewares/errors.middleware');

const HealthcheckController = require('../controllers/healthcheck.controller');

const v1 = require('./v1/index.v1.routes');

const router = express.Router();
const apiRouter = express.Router();

router.use(GeneralMiddleware());

router.use('/api', apiRouter);

// Healthy check
router.get('/', HealthcheckController.index);

// API
apiRouter.use('/v1', passpord.authenticate('basic', { session: false }), v1);

// catch 404 and forward to error handler
router.use(ErrorsMiddleware.notFound);

// generic error handler
router.use(ErrorsMiddleware.generic);

module.exports = router;
