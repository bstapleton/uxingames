const { generateHOTP } = require('./hotp');

/**
 * Generate time-based one-time password (TOTP)
 * @param secret
 * @param window
 * @returns {*}
 */
function generateTOTP(secret, window = 0, validityInSeconds = 30, initialTime = 0, passwordLength = 6) {
    const counter = Math.floor((Date.now() - initialTime) / (validityInSeconds * 1000));
    return generateHOTP(secret, counter + window, passwordLength);
}

/**
 * Verify the time-based one-time password (TOTP)
 * @param token
 * @param secret
 * @param window
 * @returns {boolean}
 */
function verifyTOTP(token, secret, window = 1) {
    try {
        token = parseInt(token, 10);
        if (isNaN(token)) {
            throw new Error();
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    if (Math.abs(+window) > 10) {
        console.error('Window size is too large');
        return false;
    }

    for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
        const totp = generateTOTP(secret, errorWindow);
        if (token === totp) {
            return true;
        }
    }

    return false;
}

module.exports = {
    generateTOTP,
    verifyTOTP
};
