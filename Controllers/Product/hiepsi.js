const Hiepsi = require('../../Models/Product/hiepsi');
const ImagesHSO = require('../../Models/Product/images_hso');

class HiepsiController {
    async create(req, res) {
        try {
            const {
                id_account,
                amount,
                username,
                password,
                content,
                sever,
                phai,
                de_tu,
                images,
            } = req.body;

            //Kiểm tra xem các thành phần có bị trống không
            if (!id_account) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền id_account.',
                });
            }

            if (!amount) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền amount.',
                });
            }
            if (!username) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền username.',
                });
            }
            if (!password) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền password.',
                });
            }
            if (!content) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền content.',
                });
            }
            if (!sever) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền server.',
                });
            }
            if (!phai) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền phai.'
                });
            }
            if (!images) {
                return res.status(200).create({
                    success: false,
                    message: 'Vui lòng điền images.',
                });
            }
            const dataImages = images.split(' , ');

            //Tạo mới bản ghi trong bảng Hiepsi
            const newHiepsi = await Hiepsi.create({
                id_account,
                amount,
                username,
                password,
                content,
                sever,
                phai,
                de_tu,
                status: 1,
            });

            //Truyền id Hiepsi mới tạo vào images_hso và tạo bản ghỉ mới cho bảng ImagesHSO
            const newImages = await Promise.all(
                dataImages.map(async (dataImage) => {
                    const newImage = await ImagesHSO.create({
                        id_accgame: newHiepsi.id,
                        dataImage,
                    })
                })
            )
            //Trả về kết quả thành công cùng với dữ liệu Hiepsi và ImagesHSO mới được tạo
            return res.status(201).json({
                success: true,
                message: 'Thành công',
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Inernal server error',
            });
        }

    }
    async getAll(req, res) {
        try {
          // Lấy danh sách sản phẩm Hiepsi từ cơ sở dữ liệu
          const hiepsiProducts = await Hiepsi.findAll({
            where: {
              status: '1',
            },
          });
    
          // Trả về kết quả thành công cùng với danh sách sản phẩm Hiepsi
          return res.status(200).json({
            success: true,
            message: 'Thành công',
            hiepsis: hiepsiProducts,
          });
        } catch (error) {
          console.error('Error getting Hiepsi products:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal server error',
          });
        }
      }
      async getAllBySeller(req, res) {
        try {
          // Lấy danh sách sản phẩm Hiepsi từ cơ sở dữ liệu
          const { id } = req.params;
          const hiepsiProducts = await Hiepsi.findAll({
            where: {
                id_account: id,
              },
        });
    
          // Trả về kết quả thành công cùng với danh sách sản phẩm Hiepsi
          return res.status(200).json({
            success: true,
            message: 'Thành công',
            hiepsis: hiepsiProducts,
          });
        } catch (error) {
          console.error('Error getting Hiepsi products:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal server error',
          });
        }
      }
      async delete(req, res) {
        try {
          const { id } = req.params;
    
          // Kiểm tra xem id có tồn tại trong bảng Hiepsi hay không
          const existingHiepsi = await Hiepsi.findByPk(id);
          if (!existingHiepsi) {
            return res.status(404).json({
              success: false,
              message: 'Không tìm thấy sản phẩm Hiepsi với id đã cho.',
            });
          }
          if (existingHiepsi.status === 2){
            return res.status(200).json({
                success: false,
                message: 'Sản phẩm đã bán',
              });
          }
    
          // Xóa bản ghi trong bảng ImagesHSO liên quan đến sản phẩm Hiepsi
          await ImagesHSO.destroy({
            where: {
              id_accgame: id,
            },
          });
    
          // Xóa bản ghi trong bảng Hiepsi
          await Hiepsi.destroy({
            where: {
              id: id,
            },
          });
    
          // Trả về kết quả thành công
          return res.status(200).json({
            success: true,
            message: 'Xóa sản phẩm Hiepsi thành công.',
          });
        } catch (error) {
          console.error('Error deleting Hiepsi product:', error);
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
            return res.status(400).json({
              success: false,
              message: 'Vui lòng cung cấp id_account.',
            });
          }
    
          // Lấy thông tin tài khoản Liên Minh từ cơ sở dữ liệu
          const lienminhAccount = await Hiepsi.findByPk(id);
    
          if (!lienminhAccount) {
            return res.status(404).json({
              success: false,
              message: 'Không tìm thấy tài khoản Liên Minh với id đã cho.',
            });
          }
    
          // Trả về kết quả thành công cùng với thông tin tài khoản Liên Minh
          return res.status(200).json({
            success: true,
            message: 'Thành công',
            accountInfo: lienminhAccount,
          });
        } catch (error) {
          console.error('Error getting Liên Minh account info:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal server error',
          });
        }
      }
    
      async updateHiepsi(req, res) {
        try {
          const { id, username, password, amount, content, sever, phai, status } = req.body;
    
          // Check if the provided ID exists in the Hiepsi table
          const existingHiepsi = await Hiepsi.findByPk(id);
          if (!existingHiepsi) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm Hiepsi!' });
          }
          if (existingHiepsi.status === 2){
            return res.status(200).json({ success: false, message: 'Sản phẩm đã bán' });
          }
    
          // Update the Hiepsi record with the provided data
          await Hiepsi.update(
            {
              username,
              password,
              amount,
              content,
              sever,
              phai,
            },
            { where: { id: id } }
          );
    
          return res.status(200).json({ success: true, message: 'Cập nhật thành công!' });
        } catch (error) {
          console.error('Error updating Hiepsi product:', error);
          return res.status(500).json({ success: false, message: 'Cập nhật thất bại!' });
        }
      }
}

module.exports = new HiepsiController();