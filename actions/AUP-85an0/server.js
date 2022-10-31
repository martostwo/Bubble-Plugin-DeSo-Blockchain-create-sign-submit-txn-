function(properties, context) {

    var axios = require('axios');
    
let UpdaterPublicKey = properties.UpdaterPublicKey ;
let PostText = properties.PostText;
let parentStakeID = properties.parentstakeid;
let imageURL = properties.imageurl;
let videoURL = properties.cloudflarevideourl;
let repostHashHex = properties.repostedposthashhex;
let embedVideo = properties.embedvideourl;
let language = properties.language;
let nodeInfo = properties.node_info;
let tag = properties.tag;
let minFee = properties.minfeeratenanosperkb;
let IsHidden = properties.IsHidden;
let node = properties.Node;
let BlogDeltaRtfFormat = properties.blogdeltartfformat;
let BlogPostIsPinned = properties.blogpostispinned;
let BlogTitleSlug = properties.blogtitleslug;
let CoverImage = properties.coverimage;
let Description = properties.description;
let Title = properties.title;
let BlogContent = properties.blogcontent;
let BlogPostURL = properties.blogposturl;
    
if(BlogDeltaRtfFormat != null){
BlogDeltaRtfFormat = BlogDeltaRtfFormat.replace(/"/g,"\"");
}

if(BlogTitleSlug != null){
BlogTitleSlug = BlogTitleSlug.replace(/"/g,"\"");
}

if(Description != null){
Description = Description.replace(/"/g,"\"");
}

if(Title != null){
Title = Title.replace(/"/g,"\"");
}

if(BlogContent != null){
BlogContent = BlogContent.replace(/"/g,"\"");
}

    if(PostText != null){
 PostText = PostText.replace(/"/g,"\"");
    }
    if(tag != null){
        tag = tag.replace(/"/g,"\"");
    }

var data = JSON.stringify({
"UpdaterPublicKeyBase58Check":UpdaterPublicKey,
"ParentStakeID": parentStakeID,

"BodyObj":{
    "Body": PostText,
    "ImageURLs": [imageURL],
    "VideoURLs":[videoURL]
    },

"RepostedPostHashHex":repostHashHex,

"PostExtraData":{
    "DNI-ZirkelsBlogContent":BlogContent,
    "DNI-ZirkelsBlogURL":BlogPostURL,
    "EmbedVideoURL": embedVideo,
    "Language": language,
    "Node": nodeInfo,
    "Tag": tag,
    "BlogDeltaRtfFormat": BlogDeltaRtfFormat,
    "BlogPostIsPinned": BlogPostIsPinned,
    "BlogTitleSlug": BlogTitleSlug,
    "CoverImage": CoverImage,
    "Description": Description,
    "Title": Title
    
    },

"IsHidden": IsHidden,
"MinFeeRateNanosPerKB":minFee
});

var config = {
    method: 'post',
    url: `https://${node}/api/v0/submit-post`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

const myPost = new Promise((resolve, reject) =>{

    axios(config)
    .then(function (response) {
        resolve(response.data);
    })
    .catch(function (error) {
        reject(error);
    });

});

    let txnHex = context.async( async callback => {
		try {
            
            let post = await myPost;
            let TransactionHex = post['TransactionHex'];
            
            callback(null,TransactionHex);
             
        }
        catch(error) {
            callback (error.name,error.message);
    	}
    });

return {TransactionHex:txnHex}


}