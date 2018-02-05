const debug = require('debug')('nfe-signer:routes:v1:nfpse');
const express = require('express');

debug('configuring routes');

const router = express.Router();

const NFPSEController = require('../../controllers/v1/nfpse.controller');

router.route('/sign')
  .post(NFPSEController.sign);

module.exports = router;
