const Account = require('../Models/Users/Account');
const Ngocrong = require('../Models/Product/ngocrong');
const Lienminh = require('../Models/Product/lienminh');
const Hiepsi = require('../Models/Product/hiepsi');

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
  async login(req, res) {
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
  async changepass(req, res) {
    try {
      const { currentPassword, newPassword, id } = req.body;

      // Tìm kiếm tài khoản theo username
      const account = await Account.findOne({ where: { id } });

      // Kiểm tra tài khoản tồn tại
      if (!account) {
        return res.status(200).json({ success: false, message: 'Account not found' });
      }

      // So sánh mật khẩu
      const isPasswordMatched = await bcrypt.compare(currentPassword, account.password);
      if (!isPasswordMatched) {
        return res.status(200).json({ success: false, message: 'Mật khẩu không đúng' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      account.password = hashedPassword;
      await account.save();

      // Trả về thông tin tài khoản nếu đăng nhập thành công
      return res.status(200).json({ success: true, message: 'Đổi mật khẩu thành công', account: account });
    } catch (error) {
      console.error('Login failed:', error);
      return res.status(200).json({ success: false, message: 'An error occurred during login' });
    }
  }
  async DashBoard(req, res) {
    try {
      const { id } = req.params;

      // Đếm số lượng đã bán 
      const ngocRongCount = await Ngocrong.count({ where: {id_account: id, status: 2 } });
      const lienminhCount = await Lienminh.count({ where: {id_account: id, status: 2 } });
      const hiepsiCount = await Hiepsi.count({ where: {id_account: id, status: 2 } });
      const daban = ngocRongCount + lienminhCount + hiepsiCount;
      // Đếm số lượng đang bán
      const ngocRongCount1 = await Ngocrong.count({ where: {id_account: id, status: 1 } });
      const lienminhCount1 = await Lienminh.count({ where: {id_account: id, status: 1 } });
      const hiepsiCount1 = await Hiepsi.count({ where: {id_account: id, status: 1 } });
      const dangban = ngocRongCount1 + lienminhCount1 + hiepsiCount1;
      // Tính doanh thu
      const ngocRongAmount = await Ngocrong.sum('amount',{ where: {id_account: id, status: 2 } } );
      const lieminhAmount = await Lienminh.sum('amount',{ where: {id_account: id, status: 2 } } );
      const hiepsiAmount = await Hiepsi.sum('amount',{ where: {id_account: id, status: 2 } } );
      const amount = ngocRongAmount + lieminhAmount + hiepsiAmount;

      return res.status(200).json({ success: true, totalAccountsSold: daban, totalAccountsInStock: dangban, totalRevenue: amount });
    } catch (error) {
      console.error('Error counting ngoc rong:', error);
      return res.status(200).json({ success: false, message: 'An error occurred while counting ngoc rong' });
    }
  }

}

module.exports = new AuthController();
