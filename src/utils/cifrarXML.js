const CryptoJS = require("crypto-js");

const cifrarXML = (xmlStr) => {    
    const originalString = xmlStr;
    const key  = '5DCC67393750523CD165F17E1EFADD21';
    const ciphertext = CryptoJS.AES.encrypt(originalString, key).toString();
    return ciphertext;
}

export default cifrarXML