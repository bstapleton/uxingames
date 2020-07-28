const crypto = require('crypto');
const base32 = require('hi-base32');

/**
 * Generate an HMAC-based one time password.
 * @param secret
 * @param counter
 * @param passwordLength
 * @param hmacAlgo
 * @returns {number}
 */
function generateHOTP(secret, counter, passwordLength = 6, hmacAlgo = 'sha1') {
    const decodedSecret = base32.decode.asBytes(secret);
    const buffer = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
        buffer[7 - i] = counter & 0xff;
        counter = counter >> 8;
    }

    const hmac = crypto.createHmac(hmacAlgo, Buffer.from(decodedSecret));
    hmac.update(buffer);
    const hmacResult = hmac.digest();

    const code = dynamicTruncationFn(hmacResult);

    return code % 10 ** passwordLength;
}

/**
 * Truncate for the Google Authenticator.
 * @param hmacValue
 * @returns {number}
 */
function dynamicTruncationFn(hmacValue) {
    const offset = hmacValue[hmacValue.length - 1] & 0xf;

    return (
        ((hmacValue[offset] & 0x7f) << 24) |
        ((hmacValue[offset + 1] & 0xff) << 16) |
        ((hmacValue[offset + 2] & 0xff) << 8) |
        (hmacValue[offset + 3] & 0xff)
    );
}

module.exports = {
    generateHOTP
};
