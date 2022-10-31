function(properties, context) {
    
const KeyEncoder = require('key-encoder').default;
const jsonwebtoken = require('jsonwebtoken');
const seedHex = properties.SeedHex;


function signJWT(seedHex){
    const keyEncoder = new KeyEncoder('secp256k1');
    const encodedPrivateKey = keyEncoder.encodePrivate(seedHex, 'raw', 'pem');
    return jsonwebtoken.sign({ }, encodedPrivateKey, { algorithm: 'ES256', expiresIn: 60 * 10 });
}



return {signed_JWT: signJWT(seedHex)}    




}