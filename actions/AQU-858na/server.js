function(properties, context) {

let hexString = properties.HexString;
let num = parseInt(hexString, 16);

return {number:num};


}