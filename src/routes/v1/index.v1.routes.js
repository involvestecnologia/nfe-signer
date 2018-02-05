const debug = require('debug')('nfe-signer:routes:v1:index');
const express = require('express');

debug('configuring routes');

const router = express.Router();

const nfpse = require('./nfpse.v1.routes');

router.use('/nfpse', nfpse);

module.exports = router;
