
import { MonetaryTransactions } from './../models/transactions.js';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors'
import { sequelize } from '../models/index.js'

const saveTransaction = async (req) => {
    const { amount, type, parent_id } = req.body;
    const { transactionId } = req.params
    if (!transactionId) {
        throw createError(StatusCodes.BAD_REQUEST, 'Please enter a transaction id');
    }
    const dataToStore = {
        amount, type,
        id: transactionId
    }

    if (parent_id) {
        // if it exists check if it is a valid transaction id 
        const parentEntry = await MonetaryTransactions.findByPk(parent_id)
        if (!parentEntry) {
            // if not a valid parent_id throw error
            throw createError(StatusCodes.BAD_REQUEST, 'Parent does not exist');
        }
        dataToStore[parent_id] = parent_id
    }
    return MonetaryTransactions.create(dataToStore).
        then(data => data).
        catch(err => {
            // check if transaction id already exist
            if (err.name === 'SequelizeUniqueConstraintError')
                throw createError(StatusCodes.BAD_REQUEST, 'Transaction exists Please create a new one!');
        });
};

const getTransaction = async (req) => {
    const { transactionId } = req.params
    if (!transactionId) {
        throw createError(StatusCodes.BAD_REQUEST, 'Please enter a transaction id');
    }
    // move to try catch
    return MonetaryTransactions.findByPk(transactionId).
        then(data => data).
        catch(err => {
            throw createError(StatusCodes.BAD_REQUEST, 'Something went wrong');
        });
};

const getTypeTransactions = async (req) => {
    const { type } = req.params
    if (!type) {
        throw createError(StatusCodes.BAD_REQUEST, 'Please enter a transaction type');
    }
    const transactionResult = await MonetaryTransactions.findAll({ where: { type } })
    return transactionResult.map(data => data.id)
};

const getTransactionsSum = async (req) => {
    const { transactionId } = req.params
    // Refered this https://dev.mysql.com/doc/refman/8.0/en/with.html
    const sum = await sequelize.query(
        `
            WITH RECURSIVE cte (id, parent_id, amount) AS
            (
                SELECT id, parent_id, 0
                FROM monetaryTransactions
                WHERE id = ?
                UNION ALL
                SELECT mt.id, mt.parent_id, mt.amount
                FROM cte AS c JOIN monetaryTransactions AS mt
                    ON c.id = mt.parent_id
            )
            SELECT SUM(amount) AS sum FROM cte;`,
        {
            replacements: [transactionId],
            type: sequelize.QueryTypes.SELECT
        }
    );
    return sum
}

export {
    getTransaction,
    saveTransaction,
    getTypeTransactions,
    getTransactionsSum
}