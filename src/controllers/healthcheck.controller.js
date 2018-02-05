const debug = require('debug')('nfe-signer:controllers:healthcheck');

const pkg = require('../../package.json');

const HealthcheckController = {

  /**
   * @api {get} / Healthcheck
   * @apiVersion 1.0.0
   * @apiName Healthcheck
   * @apiGroup Status
   * @apiPermission any
   *
   * @apiDescription Verify if the API server is running.
   *
   * @apiExample Example usage:
   * curl -i http://localhost:3000/
   */
  index: (req, res) => {
    debug('executing index action');

    res.json({ status: 'ok', version: pkg.version });
  },

};

module.exports = HealthcheckController;
