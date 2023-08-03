const Ngocrong = require('../../Models/Product/ngocrong');
const ImagesNro = require('../../Models/Product/images_nro');

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
      const ngocrongProducts = await Ngocrong.findAll();

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
      if (existingNgocrong.status === 2){
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
}

module.exports = new NgocrongController();
