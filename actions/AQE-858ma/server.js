function(properties, context) {
    
    let api = "https://node.deso.org/api/v0/get-exchange-rate";
    let quantity = properties.Quantity;
    let currency = properties.Currency;
    const axios = require('axios');


 let desoExchange = context.async( async callback => {
		try {
            
   
    let res = await axios.get(api);
    let USDperDESO = (res.data.USDCentsPerDeSoExchangeRate)/100;
    let USDperBTC = (res.data.USDCentsPerBitcoinExchangeRate)/100;
    let USDperETH = (res.data.USDCentsPerETHExchangeRate)/100;
    let exchange = 0;
    let USD = 0;
    let BTC = 0; 
    let ETH = 0;

    if(currency == "USD"){

        exchange = quantity*(1/USDperDESO);
        USD = quantity;
        BTC = quantity*(1/USDperBTC);
        ETH = quantity*(1/USDperETH);


    }else if(currency == "BTC"){
        
        exchange = quantity*USDperBTC*(1/USDperDESO);
        USD = quantity*USDperBTC;
        BTC = quantity;
        ETH = quantity*USDperBTC*(1/USDperETH);

    }else if(currency == "ETH"){

        exchange = quantity*USDperETH*(1/USDperDESO);
        USD = quantity*USDperETH;
        BTC = quantity*USDperETH*(1/USDperBTC);
        ETH = quantity;

    }else if (currency == "DESO") {

        exchange = quantity;
        USD = quantity*USDperDESO;
        BTC = quantity*USDperDESO*(1/USDperBTC);
        ETH = quantity*USDperDESO*(1/USDperETH);

    }

   
    let ex = {
        "DeSo": exchange,
        "Nanos":Math.round(exchange*(10**9)),
        "USD": USD,
        "BTC": BTC,
        "ETH": ETH
    };
            
            callback(null, ex);
             
        }
        catch {
            callback (error);
    	}
    });
    
    let exch = desoExchange;
   
    
return {"DeSo": exch.DeSo, "Nanos":exch.Nanos, "USD": exch.USD, "BTC":exch.BTC, "ETH":exch.ETH};



}