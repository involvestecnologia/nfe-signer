const debug = require('debug')('nfe-signer:services:nfpse');
const fs = require('fs');
const request = require('request-promise');
const crypto = require('crypto');
const xmlcrypto = require('xml-crypto');
const { DOMParser } = require('xmldom');
const Env = require('../../config/env');
const KeyInfoProvider = require('../../providers/keyInfo.provider');

const select = xmlcrypto.xpath;

const NFPSE_BASE_URL = Env.NODE_ENV === 'production' ? 'https://nfps-e.pmf.sc.gov.br/api/v1' : 'https://nfps-e-hml.pmf.sc.gov.br/api/v1';
const NFPSE_AUTH_TOKEN_URL = '/autenticacao/oauth/token';
const NFPSE_PROCESSA_NOTA_URL = '/processamento/notas/processa';

let _request = null;

/**
 * @param {String} file
 * @param {String} [encode = 'utf8']
 * @return {Promise.<String>}
 * @private
 */
const _getFile = (file, encode = 'utf8') => new Promise((resolve, reject) => {
  fs.readFile(file, encode, (err, result) => {
    if (err) return reject(err);
    resolve(result);
  });
});

/**
 * Parses the password to MD5 uppercase.
 *
 * @param password
 * @return {string}
 * @private
 */
const _denormalizePassword = (password) => {
  return crypto.createHash('md5').update(password).digest('hex').toUpperCase();
};

/**
 * @param {String} xml
 * @return {Promise.<void>}
 * @private
 */
const _signXml = async (xml) => {
  debug('signing xml');

  const key = await _getFile(Env.KEY_PATH);
  const certificate = await _getFile(Env.CERTIFICATE_PATH);

  const signer = new xmlcrypto.SignedXml();

  const hash = signer.findHashAlgorithm('http://www.w3.org/2000/09/xmldsig#sha1');
  const digestValue = hash.getHash(xml);

  signer.addReference(
    '/*',
    ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#WithComments'],
    'http://www.w3.org/2000/09/xmldsig#sha1',
    '',
    digestValue,
    '',
    true,
  );
  signer.canonicalizationAlgorithm = 'http://www.w3.org/2001/10/xml-exc-c14n#WithComments';
  signer.signatureAlgorithm = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
  signer.signingKey = key;
  signer.keyInfoProvider = new KeyInfoProvider(certificate);
  signer.computeSignature(xml, { prefix: 'ds' });

  const signedXml = signer.getSignedXml();

  const doc = new DOMParser().parseFromString(signedXml);
  const signature = select(doc, "/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];

  signer.loadSignature(signature);

  debug('validating xml signature');
  const validSignature = signer.checkSignature(signedXml);
  if (!validSignature) throw new Error(signer.validationErrors.join(' | '));

  return signedXml;
};

const NFPSEService = {
  /**
   * @return {Promise.<void>}
   */
  authenticate: async () => {
    debug('authenticating');

    const res = await request({
      baseUrl: NFPSE_BASE_URL,
      url: NFPSE_AUTH_TOKEN_URL,
      method: 'POST',
      form: {
        grant_type: 'password',
        username: Env.NFPS_E_CMC,
        password: _denormalizePassword(Env.NFPS_E_PASSWORD),
        client_id: Env.NFPS_E_CLIENT_ID,
        client_secret: Env.NFPS_E_CLIENT_SECRET,
      },
      auth: {
        username: Env.NFPS_E_CLIENT_ID,
        password: Env.NFPS_E_CLIENT_SECRET,
      },
      json: true,
    });

    debug('authenticated');

    _request = request.defaults({
      baseUrl: NFPSE_BASE_URL,
      headers: {
        Authorization: `Bearer ${res.access_token}`,
      },
    });

    setTimeout(() => {
      debug('token expired');

      _request = null;
    }, ((res.expires_in - 50) * 1000));
  },

  /**
   * @param xml
   * @return {Promise.<string>}
   */
  sign: async (xml) => {
    debug('signing nfe');

    if (!_request) await NFPSEService.authenticate();

    const signedXml = await _signXml(xml);

    return _request({
      url: NFPSE_PROCESSA_NOTA_URL,
      method: 'POST',
      body: signedXml,
      headers: {
        Accept: 'application/xml',
        'Content-Type': 'application/xml',
      },
    });
  },
};

module.exports = NFPSEService;
