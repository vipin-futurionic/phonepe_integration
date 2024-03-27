const sequelize = require("sequelize");
const db = require("../config/database.js");

const Transaction = db.define("transactions", {
  merchantId: {
    type: sequelize.STRING,
  },
  merchantTransactionId: {
    type: sequelize.STRING,
  },
  transactionId: {
    type: sequelize.STRING,
  },
  amount: {
    type: sequelize.NUMBER,
  },
  paymentStatus: {
    type: sequelize.STRING,
  },
  paymentJson: {
    type: sequelize.JSONB,
  },
  // createdDate: {
  //   type: sequelize.DATE,
  // },
  // updatedDate: {
  //   type: sequelize.DATE,
  // },
});

module.exports = Transaction;
