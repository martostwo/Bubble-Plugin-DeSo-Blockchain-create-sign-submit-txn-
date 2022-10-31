function(properties, context) {
    
const axios = require('axios');

let Username = properties.Username;
let GetEntriesFollowingUsername = properties.GetEntriesFollowingUsername;
let NumToFetch = properties.NumToFetch;
    
    let cleanList = context.async( async callback => {
		try {
            
    let api = "https://node.deso.org/api/v0/get-follows-stateless";

    let payload = {
        "Username": Username,
        "GetEntriesFollowingUsername": GetEntriesFollowingUsername,
        "NumToFetch": NumToFetch
    }

    let res = await axios.post(api, payload);
    let publicKeys = Object.keys(res.data.PublicKeyToProfileEntry);
    let number = res.data.NumFollowers;

            
            callback(null,[publicKeys,number]);
             
        }
        catch {
            callback (error);
    	}
    });
    
let list = cleanList;
    
return {publicKeys: list[0], NumFollowers: list[1]};
    
    

}