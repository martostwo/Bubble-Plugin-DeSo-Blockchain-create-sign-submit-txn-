function(properties, context) {

let PostText = properties.PostText;
let ImageUrl = properties.ImageUrl;

let bodyObject = {
    "Body": PostText,
    "ImageURLs": [
        ImageUrl
    ]
};

let len =  Buffer.from(JSON.stringify(bodyObject)).length;
let maxSizeLimit = false;

if(len >= 19999 ){
    maxSizeLimit = true;
}
    

return {maxSizeLimit: maxSizeLimit};


}