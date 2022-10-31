function(properties, context) {

    const createDecipher = require('crypto').createDecipher;
    let EncryptedMessage = properties.EncryptedMessage;
    let EK = properties.encryptionkey;
    
function decryptMessage(encryptedMessage, EKey) {
    const encryptionKey = EKey;
    const decipher = createDecipher('aes-256-gcm', encryptionKey);
    return decipher.update(Buffer.from(encryptedMessage, 'hex')).toString();
}
    
    let Message = decryptMessage(EncryptedMessage, EK);
    
    return {message: Message}


}