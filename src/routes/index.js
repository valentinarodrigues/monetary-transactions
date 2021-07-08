import express from 'express'
import  {transactionService} from './transactions.js'

const router = express.Router();
router.use('/transactionservice/', transactionService);

export default router;
