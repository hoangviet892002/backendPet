const ImagesHso = require('../../Models/Product/images_hso');

class ImagesHsoController{
    async getImagesByAccgameId(req, res) {
        try {
            const { id } = req.params;

            // Kiểm tra xem id_accgame có bị trống không
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Vui lòng cung cấp id_accgame.',
                });
            }

            // Lấy danh sách các ảnh của tài khoản Ngocrong với id_accgame đã cho từ cơ sở dữ liệu
            const images = await ImagesHso.findAll({
                where: {
                    id_accgame: id,
                },
            });

            // Trả về kết quả thành công cùng với danh sách ảnh
            return res.status(200).json({
                success: true,
                message: 'Thành công',
                images: images,
            });
        } catch (error) {
            console.error('Error getting images by accgame id:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async getImageByAccgameId(req, res) {
        try {
            const { id } = req.params;

            // Kiểm tra xem id_accgame có bị trống không
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Vui lòng cung cấp id_accgame.',
                });
            }

            // Lấy danh sách các ảnh của tài khoản Ngocrong với id_accgame đã cho từ cơ sở dữ liệu
            const images = await ImagesHso.findOne({
                where: {
                    id_accgame: id,
                },
            });

            // Trả về kết quả thành công cùng với danh sách ảnh
            return res.status(200).json({
                success: true,
                message: 'Thành công',
                images: images,
            });
        } catch (error) {
            console.error('Error getting images by accgame id:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async deleteImageById(req, res) {
        try {
            const { imageId } = req.params;

            // Kiểm tra xem imageId có bị trống không
            if (!imageId) {
                return res.status(400).json({
                    success: false,
                    message: 'Vui lòng cung cấp imageId.',
                });
            }

            // Xóa ảnh từ cơ sở dữ liệu dựa trên imageId
            const deletedImage = await ImagesHso.destroy({
                where: {
                    id: imageId,
                },
            });

            if (deletedImage === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy ảnh để xóa.',
                });
            }

            // Trả về kết quả thành công
            return res.status(200).json({
                success: true,
                message: 'Xóa ảnh thành công.',
            });
        } catch (error) {
            console.error('Error deleting image by id:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async addImage(req, res) {
        try {
          const { id_accgame } = req.body;
          const { imageUrl } = req.body;
    
          // Check if the required fields are provided
          if (!id_accgame || !imageUrl) {
            return res.status(400).json({
              success: false,
              message: 'Vui lòng cung cấp đủ thông tin.',
            });
          }
    
          // Create a new image record in the database
          const newImage = await ImagesHso.create({
            id_accgame: id_accgame,
            dataImage: imageUrl,
          });
    
          return res.status(201).json({
            success: true,
            message: 'Thêm ảnh thành công.',
            image: newImage,
          });
        } catch (error) {
          console.error('Error adding image:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal server error',
          });
        }
      }
}

module.exports = new ImagesHsoController();