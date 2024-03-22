const axios = require("axios");
const uniqid = require("uniqid");
const crypto = require("crypto");

const generatePaymentUrl = async (amount) => {

    try {
        const payEndPoint = "/pg/v1/pay";
        const merchantTransactionId = uniqid();
        const userID = "1234";
        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: process.env.MERCHANT_USER_ID,
            amount: Math.ceil(amount * 100), // amount should be in INR (INDIAN Rupees) so multiplying it by 100 to make it an integer value of paise (1 INR = 100 paise)
            redirectUrl: `http://localhost:3000/redirect-url/${merchantTransactionId}`,
            redirectMode: "REDIRECT",
            mobileNumber: "9999999999",
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");
        const string = payloadMain + payEndPoint + process.env.SALT_KEY;
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
        const checksum = sha256 + "###" + process.env.SALT_INDEX;
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

        const response = await axios.request(options);
        console.log(response.data);

        const url = response.data.data.instrumentResponse.redirectInfo.url;
        return url;

    } catch (error) {
        console.error("Error making payment:", error);
        throw new Error("Payment failed");
    }
};

const checkPaymentStatus = async (merchantTransactionId) => {
    try {
        if (!merchantTransactionId) {
            throw new Error("Merchant Transaction Id not found");
        }

        const string = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}${process.env.SALT_KEY}`;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const xverify = sha256 + "###"  + process.env.SALT_INDEX;

        const options = {
            method: 'GET',
            url: `${process.env.PhonePe_HOST_URL}/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': xverify,
                'X-MERCHANT-ID': process.env.MERCHANT_ID,
            }
        };

        const response = await axios.request(options);

        if (response.data.success === true) {

            return response.data;
        } else {
            throw new Error("Payment status check failed");
        }
    } catch (error) {
        console.error("Error in checking payment status:", error);
        throw new Error("Payment status check failed");
    }
}


module.exports = {
    generatePaymentUrl,
    checkPaymentStatus,
};
