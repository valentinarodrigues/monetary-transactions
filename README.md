# monetary-transactions
- Node js 
- Express framework
- MySQL
- Sequelize

API Spec:
Examples
PUT /transactionservice/transaction/10 { "amount": 5000, "type":"cars" } => { "status": "ok" }
PUT /transactionservice/transaction/11 { "amount": 10000, "type": "shopping", "parent_id": 10} => { "status": "ok" }
GET /transactionservice/transaction/10 => { "amount": 5000, "type":"cars" }
GET /transactionservice/transaction/11 { "amount": 10000, "type": "shopping", "parent_id": 10}
GET /transactionservice/types/cars => [10]
GET /transactionservice/sum/10 => {"sum":15000} 
GET /transactionservice/sum/11 => {"sum":10000}


Things to do
- Error handling
- Documentation
- Test cases
- Validation