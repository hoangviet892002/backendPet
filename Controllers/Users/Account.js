const Account = require('../../Models/Users/Account');
const TransactionController = require('../Shopacc/Transaction');
class AccountController {
    async getAllUsers(req, res) {
        try {
            // Find all users in the database
            const users = await Account.findAll();

            // Check if users are found
            if (users.length === 0) {
                return res.status(200).json({ success: false, message: 'No users found' });
            }

            // Return the users in the response
            return res.status(200).json({ success: true, message: 'Users retrieved successfully', users: users });
        } catch (error) {
            console.error('Error getting all users:', error);
            return res.status(200).json({ success: false, message: 'An error occurred while fetching users' });
        }
    }
    async changeUserRole(req, res) {
        const { userId, role } = req.body;

        try {
            // Find the user by userId in the database
            const user = await Account.findByPk(userId);

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Update the user's role
            user.role = role;
            await user.save();

            // Return the updated user in the response
            return res.status(200).json({ success: true, message: 'User role updated successfully', user });
        } catch (error) {
            console.error('Error changing user role:', error);
            return res.status(500).json({ success: false, message: 'An error occurred while changing user role' });
        }
    }
    async addMoney(req, res) {
        const { userId, amount } = req.body;

        try {
            // Find the user in the database
            const user = await Account.findOne({ where: { id: userId } });

            // Check if the user exists
            if (!user) {
                return res.status(200).json({ success: false, message: 'User not found' });
            }

            // Perform the action to add money to the user's account
            // In this example, we assume that 'balance' is a field in the user model that represents the user's account balance
            user.balance += parseInt(amount); // Assuming the amount is an integer (e.g., 100, 50, etc.)

            // Save the updated user data to the database
            await user.save();
            // Tạo giao dịch mới
            const transactionData = {
                id_account: userId,
                amount: parseInt(amount),
                comment: 'Admin present', // Ghi chú cho giao dịch (bạn có thể tùy chỉnh nếu cần)
                balance: user.balance,
            };
            // Gọi hàm create của TransactionController để tạo giao dịch mới
            await TransactionController.create(transactionData);

            // Return success response
            return res.status(200).json({ success: true, message: 'Money added successfully' });
        } catch (error) {
            console.error('Error adding money to user:', error);
            return res.status(200).json({ success: false, message: 'An error occurred while adding money' });
        }
    }

}

module.exports = new AccountController();