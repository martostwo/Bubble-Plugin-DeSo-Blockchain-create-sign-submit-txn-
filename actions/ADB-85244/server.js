function(properties, context) {

  
    const axios = require('axios').default;
    const Arweave = require('arweave');
    
    const url = 'https:'+ properties.Image;
    const contentType = ["Content-Type", "image/png"];
    const KeyWallet = JSON.parse(properties.KeyWallet);
    
    const arweave = Arweave.init({
                host: 'arweave.net',
                port: 443,
                protocol: 'https'
            });


    let upload = context.async( async callback => {
		try {
            
            
            const response = await axios.request({
               method: 'GET',
               url: url,
               responseType: 'arraybuffer',
               responseEncoding: 'binary'
            });
            
            const data = response.data;
            
            const tx = await arweave.createTransaction({ data: data }, KeyWallet);
            tx.addTag(...contentType);
            await arweave.transactions.sign(tx, KeyWallet);
            
            let uploader = await arweave.transactions.getUploader(tx);
            
            while (!uploader.isComplete) {
                
                await uploader.uploadChunk();
                console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
            }
 
            
            callback(null, `https://arweave.net/${tx.id}`);
             
        }
        catch {
            callback (error);
    	}
    });
    
   
    
return {AR_url: upload};


}