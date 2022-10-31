function(properties, context) {
    
require("core-js");
const tus = require("tus-js-client"); 
const axios = require('axios').default;
const endpt = 'https://api.bitclout.com/api/v0/upload-video';
const url = 'https:'+properties.videoUrl;

let uploadVideo = context.async( async callback => {
		try {
            
            const res = await axios.request({
                method: 'GET',
                url: url,
                responseType: 'arraybuffer',
                responseEncoding: 'binary'
            });

            const size = res.data.length;
            const file = res.data;

            let response = await axios.request({
            method: 'POST',
            url: endpt,
            headers: {
                'Upload-Length': size
              }
            });
            
            const URL = response.headers['location'];
            const ID = URL.substring(37, 69);

            // Create a new tus upload
            var upload = new tus.Upload(file, {
                endpoint: URL,
                retryDelays: [0, 3000, 5000, 10000, 20000],
                uploadSize: size,
                onError: function (error) {
                    console.log("Failed because: " + error)
                },
                onProgress: function (bytesUploaded, bytesTotal) {
                    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                    console.log(bytesUploaded, bytesTotal, percentage + "%")
                },
                onSuccess: function () {
                  console.log("Download video from %s", upload.url);
                }
             })

            // Check if there are any previous uploads to continue.
            await upload.findPreviousUploads().then(function (previousUploads) {
              // Found previous uploads so we select the first one. 
              if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0])
              }

              // Start the upload
              upload.start();

             });
            
            let videoStatus = false;
  let timerId = await setInterval(async () => {

    const resp = await axios.request({
      method: 'GET',
      url: `https://api.bitclout.com/api/v0/get-video-status/${ID}`,
    });

    videoStatus = resp.data['ReadyToStream'];
    console.log(videoStatus);

    if (videoStatus == true) {
      clearInterval(timerId);
    }

  }, 2000);
   
            callback(null,[ID,`https://iframe.videodelivery.net/${ID}`]);
             
        }
        catch {
            callback (error);
    	}
    });
    
   let videoInfo = uploadVideo;
    
return {videoID: videoInfo[0] , videoURL: videoInfo[1]};



}