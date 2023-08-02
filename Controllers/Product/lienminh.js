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
            if (!skin) {
                return res.status(200).json({
                    success: false,
                    message: 'Vui lòng điền số lượng skin.',
                });
            }
            if (!tuong) {
                return res.status(200).json({
                    success: false,
                    message: 'Vui lòng điền số lượng tướng.',
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
}

module.exports = new LienminhController();