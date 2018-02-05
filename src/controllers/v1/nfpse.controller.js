const debug = require('debug')('nfe-signer:controllers:nfpse');
const NFPSEService = require('../../services/v1/nfpse.v1.service');

const NFPSEController = {
  sign: async (req, res) => {
    debug('executing sign action');

    const xml = req.rawBody;

    try {
      const result = await NFPSEService.sign(xml);

      res.status(200).send(result);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.statusCode).send(err.response.body);
      }

      res.status(500).send(err.message);
    }
  },
};

module.exports = NFPSEController;
