
const sequelize = require('sequelize');
const db = require('../config/database.js');

const Transaction = db.define(
    'transaction',
    {
        merchantId: {
            type: sequelize.STRING
        },
        merchantTransactionId: {
            type: sequelize.STRING
        },
        transactionId: {
            type: sequelize.STRING
        },
        amount: {
            type: sequelize.STRING
        },
        status: {
            type: sequelize.STRING
        },

    },
);


module.exports = Transaction;