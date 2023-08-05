const Ngocrong = require('../../Models/Product/ngocrong');
const ImagesNro = require('../../Models/Product/images_nro');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
const Order = require('../../Models/Shopacc/Order_accgame');
const Account = require('../../Models/Users/Account');
const TransactionController = require('../Shopacc/Transaction');

class NgocrongController {
  async create(req, res) {
    try {
      const {
        id_account,
        amount,
        username,
        password,
        content,
        sever,
        hanh_tinh,
        bong_tai,
        de_tu,
        suc_manh,
        images,
      } = req.body;

      // Kiểm tra các thành phần có bị trống không
      if (!id_account) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền id_account.',
        });
      }

      if (!amount) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền amount.',
        });
      }

      if (!username) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền username.',
        });
      }

      if (!password) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền password.',
        });
      }


      if (!content) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền content.',
        });
      }

      if (!sever) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền sever.',
        });
      }

      if (!hanh_tinh) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền hanh_tinh.',
        });
      }



      if (!suc_manh) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền suc_manh.',
        });
      }

      if (!images) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng điền images.',
        });
      }
      const dataImages = images.split(' , ');


      // Tạo mới bản ghi trong bảng Ngocrong
      const newNgocrong = await Ngocrong.create({
        id_account,
        amount,
        username,
        password,
        content,
        sever,
        hanh_tinh,
        bong_tai,
        de_tu,
        suc_manh,
        status: 1
      });

      // Truyền id của Ngocrong mới tạo vào images_nro và tạo bản ghi mới trong bảng ImagesNro
      const newImages = await Promise.all(
        dataImages.map(async (dataImage) => {
          const newImage = await ImagesNro.create({
            id_accgame: newNgocrong.id,
            dataImage,
          });
        })
      );

      // Trả về kết quả thành công cùng với dữ liệu Ngocrong và ImagesNro mới được tạo
      return res.status(201).json({
        success: true,
        message: 'Thành công',
      });
    } catch (error) {
      console.error('Error creating Ngocrong:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  async getAll(req, res) {
    try {
      // Lấy danh sách sản phẩm Ngocrong từ cơ sở dữ liệu
      const ngocrongProducts = await Ngocrong.findAll({
        where: {
          status: '1',
        },
      });

      // Trả về kết quả thành công cùng với danh sách sản phẩm Ngocrong
      return res.status(200).json({
        success: true,
        message: 'Thành công',
        ngocrongs: ngocrongProducts,
      });
    } catch (error) {
      console.error('Error getting Ngocrong products:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  async getAllBySeller(req, res) {
    try {
      const { id } = req.params;
      // Lấy danh sách sản phẩm Ngocrong từ cơ sở dữ liệu
      const ngocrongProducts = await Ngocrong.findAll({
        where: {
          id_account: id,
        },
      });

      // Trả về kết quả thành công cùng với danh sách sản phẩm Ngocrong
      return res.status(200).json({
        success: true,
        message: 'Thành công',
        ngocrongs: ngocrongProducts,
      });
    } catch (error) {
      console.error('Error getting Ngocrong products:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      // Lấy danh sách sản phẩm Ngocrong từ cơ sở dữ liệu
      const ngocrongProducts = await Ngocrong.findOne({
        where: {
          id: id,
        },
      });

      // Trả về kết quả thành công cùng với danh sách sản phẩm Ngocrong
      return res.status(200).json({
        success: true,
        message: 'Thành công',
        ngocrong: ngocrongProducts,
      });
    } catch (error) {
      console.error('Error getting Ngocrong products:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Kiểm tra xem id có tồn tại trong bảng Ngocrong hay không
      const existingNgocrong = await Ngocrong.findByPk(id);
      if (!existingNgocrong) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sản phẩm Ngocrong với id đã cho.',
        });
      }
      if (existingNgocrong.status === 2) {
        return res.status(200).json({
          success: false,
          message: 'Sản phẩm đã bán',
        });
      }

      // Xóa bản ghi trong bảng ImagesNro liên quan đến sản phẩm Ngocrong
      await ImagesNro.destroy({
        where: {
          id_accgame: id,
        },
      });

      // Xóa bản ghi trong bảng Ngocrong
      await Ngocrong.destroy({
        where: {
          id: id,
        },
      });

      // Trả về kết quả thành công
      return res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm Ngocrong thành công.',
      });
    } catch (error) {
      console.error('Error deleting Ngocrong product:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  async getAccountInfo(req, res) {
    try {
      const { id } = req.params;

      // Kiểm tra xem id_account có bị trống không
      if (!id) {
        return res.status(200).json({
          success: false,
          message: 'Vui lòng cung cấp id_account.',
        });
      }

      // Lấy thông tin tài khoản Ngocrong từ cơ sở dữ liệu
      const ngocrongAccount = await Ngocrong.findByPk(id);

      if (!ngocrongAccount) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy tài khoản Ngocrong với id đã cho.',
        });
      }

      // Trả về kết quả thành công cùng với thông tin tài khoản Ngocrong
      return res.status(200).json({
        success: true,
        message: 'Thành công',
        accountInfo: ngocrongAccount,
      });
    } catch (error) {
      console.error('Error getting Ngocrong account info:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  async updateNgocrong(req, res) {
    try {
      const { id, username, password, content, sever, hanh_tinh, bong_tai, de_tu, suc_manh, status } = req.body;

      // Check if the provided ID exists in the Ngocrong table
      const existingNgocrong = await Ngocrong.findByPk(id);
      if (!existingNgocrong) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản Ngocrong!' });
      }
      if (existingNgocrong.status === 2) {
        return res.status(200).json({ success: false, message: 'Sản phẩm đã bán' });
      }
      

      // Update the Ngocrong record with the provided data
      await Ngocrong.update(
        {
          username,
          password,
          content,
          sever,
          hanh_tinh,
          bong_tai,
          de_tu,
          suc_manh,
          status,
        },
        { where: { id: id } }
      );

      return res.status(200).json({ success: true, message: 'Cập nhật thành công!' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Cập nhật thất bại!' });
    }
  };
  async getRelatedProducts (req, res) {
    try {
      const { id } = req.params; // Assuming you pass the current product's ID in the request params
  
      // Fetch the current product details to get its server and planet attributes
      const currentProduct = await Ngocrong.findByPk(id);
  
      if (!currentProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const limit = 4; // Set the maximum number of related products to fetch
  
      // Query for related products with the same server and planet as the current product
      const relatedProducts = await Ngocrong.findAll({
        where: {
          id: { [Sequelize.Op.ne]: id }, // Exclude the current product from the results
          sever: currentProduct.sever,
          hanh_tinh: currentProduct.hanh_tinh,
          status: 1,
        },
        limit,
      });
  
      return res.json({ ngocrongs: relatedProducts });
    } catch (error) {
      console.error('Error fetching related products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  async buy (req, res) {
    try {
      const { id } = req.body; // Assuming you pass the current product's ID in the request params
      const { accountId } = req.body;
  
      // Fetch the current product details to get its server and planet attributes
      const ngocrongProducts = await Ngocrong.findOne({
        where: {
          id: accountId,
        },
      });
      
  
      if (!ngocrongProducts) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const account = await Account.findOne({
        where: {
          id: id,
        },
      });
      if (!account) {
        return res.status(200).json({success :false, message: 'Bạn chưa đăng nhập' });
      }
      if (account.balance< ngocrongProducts.amount) {
        return res.status(200).json({ success :false, message: 'Bạn không đủ tiền' });
      }
      if (ngocrongProducts.status === 2) {
        return res.status(200).json({success :false, message: 'Sản phẩm đã được bán' });
      }
      ngocrongProducts.status =2;
      account.balance = account.balance - ngocrongProducts.amount;
      await Order.create ({
        id_account: account.id,
        content: 'Ngọc rồng',
        username: ngocrongProducts.username,
        password: ngocrongProducts.password
      });
      await ngocrongProducts.save();
      await account.save();
      const transactionData = {
        id_account: account.id,
        amount: -ngocrongProducts.amount,
        comment: 'Mua acc', // Ghi chú cho giao dịch (bạn có thể tùy chỉnh nếu cần)
        balance: account.balance,
    };
    await TransactionController.create(transactionData);

  
      
  
      return res.json({success:true, message: 'success' });
    } catch (error) {
      console.error('Error fetching related products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = new NgocrongController();
