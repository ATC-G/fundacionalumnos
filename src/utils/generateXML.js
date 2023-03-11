import sumCart from "./sumCart"

const generateXML = (cart) => {
    const XMLWriter = require('xml-writer');
    const xw = new XMLWriter();
    xw.startDocument('1.0', 'UTF-8');
    xw.startElement('P');
    xw.startElement('business')
    xw.writeElement('id_company', 'SNBX')
    xw.writeElement('id_branch', '01SNBXBRNCH')
    xw.writeElement('user', 'SNBXUSR0123')
    xw.writeElement('pwd', 'SECRETO')
    xw.endElement()
    xw.startElement('url')
    xw.writeElement('reference', 'FACTURA999')
    xw.writeElement('amount', `${sumCart(cart)}.00`)
    xw.writeElement('moneda', 'MXN')
    xw.writeElement('canal', 'W')
    xw.startElement('data3ds')
    xw.writeElement('ml', 'nospam@gmail.com')
    xw.writeElement('cl', '5515009020')
    xw.writeElement('dir', 'Calle y número exterior')
    xw.writeElement('cd', 'Ciudad')
    xw.writeElement('est', 'CX')
    xw.writeElement('cp', '1234567890')
    xw.writeElement('idc', '484')
    xw.endElement()
    xw.writeElement('version', 'IntegraWPP')
    xw.endDocument();

    return xw;

   
}

export default generateXML