import express from 'express'
import {
    getTransaction,
    saveTransaction,
    getTypeTransactions,
    getTransactionsSum
} from './../controllers/transactions.js'
import responseHandler from '../middlewares/response-handler.js'
const transactionService = express.Router();

transactionService.put('/transaction/:transactionId', responseHandler(saveTransaction));
transactionService.get('/transaction/:transactionId', responseHandler(getTransaction));
transactionService.get('/types/:type', responseHandler(getTypeTransactions));
transactionService.get('/sum/:transactionId', responseHandler(getTransactionsSum));

export { transactionService }

//  PUT /transactionservice/transaction/10 { "amount": 5000, "type":"cars" } => { "status": "ok" } 
// PUT /transactionservice/transaction/11 { "amount": 10000, "type": "shopping", "parent_id": 10} => { "status": "ok" } 
// GET /transactionservice/types/cars => [10] 
// GET /transactionservice/sum/10 => {"sum":15000} 
// GET /transactionservice/sum/11 => {"sum":10000}
