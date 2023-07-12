import { post } from "./api";
import * as url from "./url";

const sendPaymentData = (data) => post(url.PAYMENT, data);


export {
    sendPaymentData
};

