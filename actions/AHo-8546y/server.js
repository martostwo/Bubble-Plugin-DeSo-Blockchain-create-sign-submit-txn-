function(properties, context) {
    
           let action = properties.action;    
           let identityWindow = null;

        function logIn() {
            identityWindow = window.open('https://identity.deso.org/log-in?accessLevelRequest=4', null, 'toolbar=no, width=800, height=1000, top=0, left=0');
        }
    
        function signUp() {
            identityWindow = window.open('https://identity.deso.org/sign-up?accessLevelRequest=4', null, 'toolbar=no, width=800, height=1000, top=0, left=0');
        }

        function uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        const Uuid = uuid();

        function createReq(pl, uuid) {

            const req = {
                id: uuid,
                method: "sign",
                payload: pl,
                service: "identity",
            };

            return req;

        }

        function sign(accessLevel, accessLevelHmac, encryptedSeedHex, transactionHex) {

            const Payload = {
                accessLevel: accessLevel,
                accessLevelHmac: accessLevelHmac,
                encryptedSeedHex: encryptedSeedHex,
                transactionHex: transactionHex
            };

            let Req = createReq(Payload, Uuid);
            const Iframe = document.getElementById("identity");
            Iframe.contentWindow.postMessage(Req, "https://identity.deso.org");
        }

        function handleMessage(event) {
            const { data } = event;
            const { service, method } = data;

            if (service !== "identity") {
                return;
            }

            // Methods are present on incoming requests but not responses
            if (method) {
                console.log('request: ', data);
                

                if (method == 'login') {

                    var PKA = data.payload.publicKeyAdded;
                    var user = data.payload.users[PKA];
                    console.log(user);

                    if (identityWindow) {
                        identityWindow.close();
                        identityWindow = null;
                    }

                }

            } else if (data.id == Uuid) {
                console.log(data.payload);
                
            }

        }
    
    
        if (action == "login") {

            logIn();

        } else if (action == "signup") {

            signUp();

        } else if (action == "sign") {

            sign(properties.accesslevel, properties.accesslevelhmac, properties.encryptedseedhex, properties.txnhex);

        }
    
        window.addEventListener("message", (event) => handleMessage(event));

}


