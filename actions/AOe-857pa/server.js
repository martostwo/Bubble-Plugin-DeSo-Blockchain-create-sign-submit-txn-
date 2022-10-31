function(properties, context) {

const axios = require('axios').default;    
let url = properties.notionImageUrl;
let filename = properties.filename;   
    
    
    let getImage = context.async( async callback => {
		try {
            
                const response = await axios.request({
                           method: 'GET',
                           url: url,
                           responseEncoding: 'base64'
                });
            
            let data = response.data;
                
            
            callback(null,data);
             
        }
        catch {
            callback (error);
    	}
    });
    
    let dataImg = getImage;
       
return {"filename":filename, "contents":dataImg}


}