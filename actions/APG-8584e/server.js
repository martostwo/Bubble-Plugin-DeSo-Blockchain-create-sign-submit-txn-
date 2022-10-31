function(properties, context) {

let num = properties.number;
let hex = `0x${num.toString(16)}`;

return {numberHex: hex};


}