// Asynchronous
const crypto = require('crypto').randomBytes(256).toString('hex'); //Provide cryptographic functionality (Openssl's hash, HMAC, decipher, sign and verify functions)

module.exports = {
    uri: 'mongodb://localhost:27017/mean-angular-2', //Database URI and database name
    secret: crypto, //Crypto-created secret
    db: 'mean-angular-2' // Database name
}