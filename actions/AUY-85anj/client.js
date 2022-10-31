function(properties, context) {
    
    
    //---------------txn count limit map---------------------
    
    let arrayCount = properties.TransactionCountLimitMap;
    
    let countJSON={};

    for(let pair of arrayCount){
        
      countJSON[pair.key] = pair.value;
        
    }
    
    //---------------creator coin limit map---------------------
    
    let creatorPk = properties.creator_publickey;
    let creatorJSON = null;
    
    if(creatorPk){
    
     let arrayCreator = properties.CreatorLimitMap;
    
     creatorJSON = {};
        
if(creatorPk == "all"){
 creatorJSON[""] = {};
}else{
 creatorJSON[creatorPk] = {};
}
        
    
     for(let pair of arrayCreator){
        
       creatorJSON[Object.keys(creatorJSON)[0]][pair.key] = pair.value;
        
     }
        
    }
    
    //--------------dao coin limit map--------------------------
    
    let daoPk = properties.dao_publickey;
    let daoJSON = null;
    
    if(daoPk){
    
     let arrayDao = properties.dao_limit_map;
    
     daoJSON = {};
    
if(daoPk == "all"){
 daoJSON[""] = {};
}else{
 daoJSON[daoPk] = {};
}
    
     for(let pair of arrayDao){
        
       daoJSON[Object.keys(daoJSON)[0]][pair.key] = pair.value;
        
     }
        
    }
    
    //--------------n limit map--------------------------
    
    let NFTHashHex = properties.nft_posthashhex;
    let nftJSON = null;
    
    if(NFTHashHex){
    
     let arrayNFT = properties.nft_limit_map;
    
     nftJSON = {};
    
if(NFTHashHex == "all"){
 nftJSON[""] = {0:{}};
}else{
 nftJSON[NFTHashHex] = {0:{}};
}
    
     for(let pair of arrayNFT){
        
       nftJSON[Object.keys(nftJSON)[0]][0][pair.key] = pair.value;
        
     }
        
    }
    
    
    derive(properties.publickey ,properties.expiration_days, properties.global_deso_limit, countJSON, creatorJSON,daoJSON,nftJSON,properties.unlimited);
    

    

}