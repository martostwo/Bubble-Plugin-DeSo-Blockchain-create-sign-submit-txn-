function(properties, context) {

const axios = require('axios').default;
const url = 'https:'+ properties.ImageURL;

    let encoding = context.async( async callback => {
		try {
            
            
            const response = await axios.request({
                  method: 'GET',
                  url: url,
                  responseEncoding: 'base64'
            });
            
 
            
            callback(null, response.data);
             
        }
        catch {
            callback (error);
    	}
    });
    

return {imageBase64: encoding }

}