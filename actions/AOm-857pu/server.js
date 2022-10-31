function(properties, context) {

    const createCipher = require('crypto').createCipher;
    let message = properties.message;
    let EK = properties.encryptionkey;
    let PK = properties.publicKey;
    
    function encryptMessage(message, EKey) {
    const encryptionKey = EKey;
    const cipher = createCipher('aes-256-gcm', encryptionKey);
    return cipher.update(message).toString('hex');
}
    
    let encryptMes = encryptMessage(`${message} | PublicKey: ${PK}`, EK);
    
    return {encrypted_message: encryptMes}


}