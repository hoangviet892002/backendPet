const Account = require('../Models/Users/Account');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthController {
    async register(req, res) {
        try {
            const { username, password, email } = req.body;

            // Kiểm tra xem tài khoản đã tồn tại trong cơ sở dữ liệu chưa
            const existingUsernameAccount = await Account.findOne({ where: { username } });
            if (existingUsernameAccount) {
                return res.status(200).json({ success: false, message: 'Tài khoản đã tồn tại' });
            }

            // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
            const existingEmailAccount = await Account.findOne({ where: { email } });
            if (existingEmailAccount) {
                return res.status(200).json({ success: false, message: 'Email đã tồn tại' });
            }

            // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Tạo tài khoản mới
            const newAccount = await Account.create({
                username,
                password: hashedPassword,
                email,
                role: 1, // Gán quyền mặc định cho tài khoản (ví dụ: 1 là user, 2 là admin)
                balance: 0, // Gán số dư mặc định cho tài khoản (nếu cần)
            });

            return res.status(200).json({ success: true, message: 'Đăng ký thành công', account: newAccount });
        } catch (error) {
            console.error(error);
            return res.status(200).json({ success: false, message: 'Đã xảy ra lỗi trong quá trình đăng ký' });
        }
    }
    async  login(req, res) {
        try {
          const { username, password } = req.body;
      
          // Tìm kiếm tài khoản theo username
          const account = await Account.findOne({ where: { username } });
      
          // Kiểm tra tài khoản tồn tại
          if (!account) {
            return res.status(200).json({ success: false, message: 'Account not found' });
          }
      
          // So sánh mật khẩu
          const isPasswordMatched = await bcrypt.compare(password, account.password);
          if (!isPasswordMatched) {
            return res.status(200).json({ success: false, message: 'Invalid password' });
          }
      
          // Trả về thông tin tài khoản nếu đăng nhập thành công
          return res.status(200).json({ success: true, message: 'Login successful', account: account });
        } catch (error) {
          console.error('Login failed:', error);
          return res.status(200).json({ success: false, message: 'An error occurred during login' });
        }
      }
}

module.exports = new AuthController();
