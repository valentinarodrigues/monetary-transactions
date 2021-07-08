import { Sequelize, sequelize } from './index.js'

// monetaryTransactions table
// amount - double
// transaction is - primary key long
// type - string
// parent id - self transaction id optional

const MonetaryTransactions =  sequelize.define("monetaryTransactions", {
    amount: {
        type: Sequelize.DOUBLE
    },
    type: {
        type: Sequelize.STRING
    },
    parent_id: {
        type: Sequelize.INTEGER,
        hierarchy: true // to establish parent child relationship
    }
});
export {MonetaryTransactions}