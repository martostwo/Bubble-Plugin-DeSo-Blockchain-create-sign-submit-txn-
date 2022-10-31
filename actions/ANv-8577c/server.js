function(properties, context) {
    
    
 const axios = require('axios').default;
 const core = require("core-js");   
 let videoStatus = false;
 let ID = properties.ID;
 let x = properties.Size;
 let m = 2.0115*Math.pow(10, -6);
 let n = 10.85;    
 let t =m*x + n;   
    
let timerId = setInterval(() => {

 let response = context.async(async callback => {
    
    try {
        
      const resp = await axios.request({
      method: 'GET',
      url: `https://api.bitclout.com/api/v0/get-video-status/${ID}`,
      });

        callback(null,resp);

    }
    catch {
        callback(error);
    }
 });

videoStatus = response.data['ReadyToStream'];
console.log(videoStatus);

    

if (videoStatus == true) {
      clearInterval(timerId);
    }

  }, t);

}