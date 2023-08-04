const Lienminh = require('../../Models/Product/lienminh');
const ImagesLMHT = require('../../Models/Product/images_lmht');
const { promise } = require('bcrypt/promises');

class LienminhController {
    async create(req, res) {
        try {
            const {
                id_account,
                amount,
                username,
                password,
                content,
                skin,
                tuong,
                rank,
                images,
            } = req.body;

            //Kiểm tra xem các thành phần có bị trống không
            if (!id_account) {
                return res.status(200).json({
                    success: false,
                    message: 'Vui lòng điển id_account.',
                });
            }
            if (!amount) {
                return res.status(200).json({
                    success: false,
                    message: 'Vui lòng điển amount.',
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
           
            
            if (!rank) {
                return res.status(200).json({
                    success: false,
                    message: 'Vui lòng điền mức rank của mình.',
                })
            }
            if (!images) {
                return res.status(200).json({
                    success: false,
                    message: 'Vui lòng điền images.',
                });
            }
            const dataImages = images.split(' , ');

            //Tạo mới bản ghi trong bảng LMHT
            const newLMHT = await Lienminh.create({
                id_account,
                amount,
                username,
                password,
                content,
                skin,
                tuong,
                rank,
                status: 1,
            });

            //Truyền id của Lienminh mới tạo vào images_lmht và tạo bản ghi mới trong ImagesLMHT
            const newImages = await Promise.all(
                dataImages.map(async (dataImage) => {
                    const newImage = await ImagesLMHT.create({
                        id_accgame: newLMHT.id,
                        dataImage,
                    });
                })
            );

            //Trả về kết quả thành công cùng với dữ liệu LMHT và ImagesLMHT mới được tạo
            return res.status(201).json({
                success: true,
                message: 'Thành công',
            });
        } catch (error) {
            console.error('Error creating LNHT: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async getAll(req, res) {
        try {
            // Lấy danh sách sản phẩm LMHT từ cơ sở dữ liệu
            const lienminhProducts = await Lienminh.findAll({
                where: {
                  status: '1',
                },
              });

            // Trả về kết quả thành công cùng với danh sách sản phẩm LMHT
            return res.status(200).json({
                success: true,
                message: 'Thành công',
                lienminhs: lienminhProducts,
            });
        } catch (error) {
            console.error('Error getting LNHTs: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async getAllBySeller(req, res) {
        try {
            const { id } = req.params;
            // Lấy danh sách sản phẩm LMHT từ cơ sở dữ liệu
            const lienminhProducts = await Lienminh.findAll({
                where: {
                    id_account: id,
                  },
            });

            // Trả về kết quả thành công cùng với danh sách sản phẩm LMHT
            return res.status(200).json({
                success: true,
                message: 'Thành công',
                lienminhs: lienminhProducts,
            });
        } catch (error) {
            console.error('Error getting LNHTs: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async delete(req, res) {
        try {
          const { id } = req.params;
    
          // Kiểm tra xem id có tồn tại trong bảng Lienminh hay không
          const existingLienminh = await Lienminh.findByPk(id);
          if (!existingLienminh) {
            return res.status(404).json({
              success: false,
              message: 'Không tìm thấy sản phẩm Lienminh với id đã cho.',
            });
          }
          if (existingLienminh.status === 2){
            return res.status(200).json({
                success: false,
                message: 'Sản phẩm đã bán',
              });
          }
    
          // Xóa bản ghi trong bảng ImagesLMHT liên quan đến sản phẩm Lienminh
          await ImagesLMHT.destroy({
            where: {
              id_accgame: id,
            },
          });
    
          // Xóa bản ghi trong bảng Lienminh
          await Lienminh.destroy({
            where: {
              id: id,
            },
          });
    
          // Trả về kết quả thành công
          return res.status(200).json({
            success: true,
            message: 'Xóa sản phẩm Lienminh thành công.',
          });
        } catch (error) {
          console.error('Error deleting Lienminh product:', error);
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
    
          // Lấy thông tin tài khoản Liên Minh từ cơ sở dữ liệu
          const lienminhAccount = await Lienminh.findByPk(id);
    
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
      };
    
      async updateLienminh(req, res) {
        try {
          const { id, username, password, amount, content, skin, tuong, rank } = req.body;
    
          // Check if the provided ID exists in the Lienminh table
          const existingLienminh = await Lienminh.findByPk(id);
          if (!existingLienminh) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản Liên Minh!' });
          }
          if (existingLienminh.status === 2){
            return res.status(200).json({ success: false, message: 'Sản phẩm đã bán' });
          }
    
          // Update the Lienminh record with the provided data
          await Lienminh.update(
            {
              username,
              password,
              amount,
              content,
              skin,
              tuong,
              rank,
            },
            { where: { id: id } }
          );
    
          return res.status(200).json({ success: true, message: 'Cập nhật thành công!' });
        } catch (error) {
          console.error('Error:', error);
          return res.status(500).json({ success: false, message: 'Cập nhật thất bại!' });
        }
      };
      
}

module.exports = new LienminhController();