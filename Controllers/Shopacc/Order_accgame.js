const Order = require('../../Models/Shopacc/Order_accgame');

class OrderController {

    async getAccGameByIdAccount(req, res) {
        try {
            const { id_account } = req.params;

            // Thực hiện truy vấn database để lấy danh sách các acc game theo id_account
            const accGames = await Order.findAll({
                where: {
                    id_account: id_account,
                },
            });

            // Kiểm tra nếu không tìm thấy acc game nào, trả về mã lỗi 404
            if (!accGames || accGames.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy danh sách acc game cho id_account này.' });
            }

            // Trả về danh sách acc game nếu tìm thấy
            return res.json(accGames);
        } catch (error) {
            console.error('Error fetching acc game by id_account:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    }

}

module.exports = new OrderController();