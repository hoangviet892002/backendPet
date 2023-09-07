const Customer = require('../Models/Account/Customer');
const Employee = require('../Models/Account/Employee');
const Admin = require('../Models/Account/Admin');
const now = new Date();
const timeZoneOffset = 7 * 60; // 7 giờ x 60 phút/giờ
now.setMinutes(now.getMinutes() + timeZoneOffset);


const bcrypt = require('bcrypt');

class AuthController {
    async  register(req, res) {
        try {
          const { name, phone, address, account, password, avatar } = req.body;
      
          // Kiểm tra xem tài khoản đã tồn tại trong bảng Customer
          const existingCustomer = await Customer.findOne({ where: { account } });
      
          // Kiểm tra xem tài khoản đã tồn tại trong bảng Admin
          const existingAdmin = await Admin.findOne({ where: { account } });
      
          // Kiểm tra xem tài khoản đã tồn tại trong bảng Employee
          const existingEmployee = await Employee.findOne({ where: { account } });
      
          // Nếu tài khoản đã tồn tại trong bất kỳ bảng nào, trả về lỗi
          if (existingCustomer || existingAdmin || existingEmployee) {
            return res.status(200).json({ success: false, message: 'Tài khoản đã tồn tại' });
          }
      
          // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
          const hashedPassword = await bcrypt.hash(password, 10); // Sử dụng 10 vòng lặp
      
          // Tạo một khách hàng mới (hoặc admin/employee tùy thuộc vào loại tài khoản) trong cơ sở dữ liệu
          const newAccount = await Customer.create({
            name,
            phone,
            address,
            account,
            password: hashedPassword, // Lưu mật khẩu đã được mã hóa
            avatar,
            createdAt : now,
            updatedAt : now,
          });
      
          // Trả về kết quả thành công
          return res.status(200).json({ success: true, message: 'Đăng ký thành công', account: newAccount });
        } catch (error) {
          console.error(error);
          return res.status(200).json({ success: false, message: 'Đã xảy ra lỗi trong quá trình đăng ký' });
        }
      }
      
      
    
}
module.exports = new AuthController();
