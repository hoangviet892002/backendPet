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
          const hiepsiProducts = await Hiepsi.findAll();
    
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
}

module.exports = new HiepsiController();