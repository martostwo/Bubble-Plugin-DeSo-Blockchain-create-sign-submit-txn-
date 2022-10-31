function(properties, context) {
    
    const randomBytes = require('crypto').randomBytes;
    
    function newEncryptionKey() {
    return randomBytes(32).toString('hex');
}

    let EK = newEncryptionKey();
    
    return {encryption_key: EK};


}