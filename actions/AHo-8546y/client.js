function(properties, context) {
    
        let action = properties.action;
        let typeTxn = properties.type_of_txn;
    
    
        if (action == "login") {

            logIn();

        } else if (action == "signup") {

            signUp();

        } else if (action == "sign") {

            sign(properties.accesslevel, properties.accesslevelhmac, properties.encryptedseedhex, properties.txnhex);
            typeOfTxn(typeTxn);
           
        }else if (action == "jwt") {
            
            getJWT(properties.accesslevel, properties.accesslevelhmac, properties.encryptedseedhex);
            
        }
    


}