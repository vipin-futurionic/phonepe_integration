require("dotenv").config();
const axios = require("axios");
const uniqid = require("uniqid");
const crypto = require("crypto");


const makePayment = (req, res) => {


    const payEndPoint = "/pg/v1/pay";
    const merchantTransactionId = uniqid();
    const userID = "1234";
    const data = {
        merchantId: process.env.MERCHANT_ID,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userID,
        amount: 300000000,
        redirectUrl: `http://localhost:3000/redirect-url/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };


    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + payEndPoint + process.env.SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const options = {
        method: "POST",
        url: process.env.PhonePe_HOST_URL + payEndPoint,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
        },
        data: {
            request: payloadMain,
        },
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            const url = response.data.data.instrumentResponse.redirectInfo.url;

            res.redirect(url);
        })
        .catch(function (error) {
            console.error(error);
        });

}

module.exports = {
    makePayment,
};
