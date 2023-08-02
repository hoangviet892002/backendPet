const Transaction = require('../../Models/Shopacc/Transaction');

class TransactionController {
    async create(transactionData) {
        try {
          // Tạo giao dịch mới trong cơ sở dữ liệu bằng cách sử dụng phương thức create của Transaction
          const createdTransaction = await Transaction.create(transactionData);
          return { success: true, message: 'Transaction created successfully', transaction: createdTransaction };
        } catch (error) {
          console.error('Error creating transaction:', error);
          return { success: false, message: 'An error occurred while creating transaction' };
        }
      }

    
}

module.exports = new TransactionController();