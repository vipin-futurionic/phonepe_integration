require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;



// Database
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));


app.use(express.static("public"));
app.use(express.json());

app.use("/", require('./routes/root'));
app.use('/pay', require('./routes/paymentRoutes/paymentRoute'));
app.use('/redirect-url', require('./routes/paymentRoutes/redirectRoute'));


app.listen(port, () => {
    console.log(`Server running at:${port}`);
});

// const PhonePe_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
// const MERCHANT_ID = "PGTESTPAYUAT";
// const SALT_INDEX = 1;
// const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";


// app.get("/pay", (req, res) => {
//     const payEndPoint = "/pg/v1/pay";

//     const merchantTransactionId = uniqid();
//     const userID = "1234";
//     const data = {
//         merchantId: MERCHANT_ID,
//         merchantTransactionId: merchantTransactionId,
//         merchantUserId: userID,
//         amount: 300000000,
//         redirectUrl: `http://localhost:3000/redirect-url/${merchantTransactionId}`,
//         redirectMode: "REDIRECT",
//         mobileNumber: "9999999999",
//         paymentInstrument: {
//             type: "PAY_PAGE",
//         },
//     };

//     // const bufferObj = Buffer.from(JSON.stringify(payload), "utf-8");
//     // const base64Encoded = bufferObj.toString("base64");
//     // const xverify = sha256(base64Encoded + payEndPoint + SALT_KEY) + "###" + SALT_INDEX;

//     const payload = JSON.stringify(data);
//     const payloadMain = Buffer.from(payload).toString("base64");
//     const keyIndex = 1;
//     const string = payloadMain + "/pg/v1/pay" + SALT_KEY;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###" + keyIndex;
//     const options = {
//         method: "POST",
//         url: PhonePe_HOST_URL + payEndPoint,
//         headers: {
//             accept: "application/json",
//             "Content-Type": "application/json",
//             "X-VERIFY": checksum,
//         },
//         data: {
//             request: payloadMain,
//         },
//     };

//     axios
//         .request(options)
//         .then(function (response) {
//             console.log(response.data);
//             const url = response.data.data.instrumentResponse.redirectInfo.url;

//             res.redirect(url);
//         })
//         .catch(function (error) {
//             console.error(error);
//         });
// });