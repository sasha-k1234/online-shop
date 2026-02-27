const crypto = require('crypto');

function generateRefreshToken() {
    return crypto.randomBytes(20).toString('hex');
}

module.exports = generateRefreshToken;