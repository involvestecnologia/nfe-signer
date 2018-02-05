const forge = require('node-forge');

const { pki } = forge;

/**
 * @param certObj
 * @return {*}
 */
const getSubjectName = (certObj) => {
  let subjectFields;
  const fields = ['CN', 'OU', 'O', 'L', 'ST', 'C'];

  if (certObj.subject) {
    subjectFields = fields.reduce((subjects, fieldName) => {
      const certAttr = certObj.subject.getField(fieldName);

      if (certAttr) {
        subjects.push(`${fieldName}=${certAttr.value}`);
      }

      return subjects;
    }, []);
  }

  return Array.isArray(subjectFields) ? subjectFields.join(',') : '';
};

class KeyInfoProvider {
  /**
   * @param certificatePem
   */
  constructor(certificatePem) {
    if (Buffer.isBuffer(certificatePem)) {
      certificatePem = certificatePem.toString('ascii');
    }

    if (certificatePem === null || typeof certificatePem !== 'string') {
      throw new Error('certificatePEM must be a valid certificate in PEM format');
    }

    this._certificatePem = certificatePem;
  }

  /**
   * @param key
   * @param prefix
   * @return {string}
   */
  getKeyInfo(key, prefix) {
    prefix = prefix ? `${prefix}:` : '';

    const certBodyInB64 = forge.util.encode64(forge.pem.decode(this._certificatePem)[0].body);
    const certObj = pki.certificateFromPem(this._certificatePem);

    return `
      <${prefix}X509Data>
        <${prefix}X509IssuerSerial>
          <${prefix}X509IssuerName>${getSubjectName(certObj)}</${prefix}X509IssuerName>
          <${prefix}X509SerialNumber>${certObj.serialNumber}</${prefix}X509SerialNumber>
        </${prefix}X509IssuerSerial>
        <${prefix}X509Certificate>${certBodyInB64}</${prefix}X509Certificate>
      </${prefix}X509Data>
    `.replace(/ {6}/g, '');
  }

  /**
   * @return {*}
   */
  getKey() {
    return this._certificatePem;
  }
}

module.exports = KeyInfoProvider;
