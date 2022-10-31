function(properties, context) {
    
//import fetch from 'node-fetch';
const fetch = require('node-fetch');
//App data:
let serialNumber = properties.serialNumber.get(0,properties.serialNumber.length());
let ownerApp = properties.ownerApp;
let PostHashHex = properties.PostHashHex;
let ReaderPublicKeyBase58Check = properties.ReaderPublicKeyBase58Check;

//API Call
var url = 'https://node.desonocode.com/api/v0/get-nft-collection-summary';
var data = {"PostHashHex":PostHashHex, "ReaderPublicKeyBase58Check":ReaderPublicKeyBase58Check};

let postData = context.async( async callback => {
    try {

        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
        });

      let NFTEntries = await response.json();
      let ownerDeso = [];
      let newOwners = [];
      let serialNumberNewOwners = [];
      let NFTsUserOwns = [];
      let j = 0;
      let k = 0;  

      for(i=0; i<serialNumber.length; i++){

        ownerDeso[i] = NFTEntries.SerialNumberToNFTEntryResponse[serialNumber[i]].OwnerPublicKeyBase58Check;

        if(ownerDeso[i] !== ownerApp){
          newOwners[k] = ownerDeso[i];
          serialNumberNewOwners[k] = serialNumber[i];
          k = k + 1;  
        }else{
          NFTsUserOwns[j] = serialNumber[i];
          j = j + 1;
        }

      }
        
        callback(null,[NFTsUserOwns,newOwners,serialNumberNewOwners]);
         
    }
    catch {
        callback (error);
    }
});

    let result = postData;

return {NFTsUserOwns: result[0], newOwners: result[1], serialNumberNewOwners: result[2]};



}