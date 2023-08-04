
const HiepsiRouter = require ('./Product/hiepsi');
const LienminhRouter = require ('./Product/lienminh');
const NgocrongRouter = require ('./Product/ngocrong');
const IMGNgocrongRouter = require ('./Product/images_nro');
const IMGLienMinhRouter = require ('./Product/images_lmht');
const IMGHiepsiRouter = require ('./Product/images_hso');
const OrderRouter = require ('./Shopacc/Order');
const Transaction_momoRouter = require ('./Shopacc/Transaction_momo');
const TransactionRouter = require ('./Shopacc/Transaction');
const AccountRouter = require ('./Users/Account');
const AuthRouter = require ('./authRouters');

function route(app) {
    app.use('/api/hiepsi', HiepsiRouter);

    app.use('/api/imageshiepsi', IMGHiepsiRouter);

    app.use('/api/lienminh', LienminhRouter);

    app.use('/api/imageslienminh', IMGLienMinhRouter);

    app.use('/api/ngocrong', NgocrongRouter);

    app.use('/api/imagesngocrong', IMGNgocrongRouter);

    app.use('/api/order', OrderRouter);

    app.use('/api/transactionmomo', Transaction_momoRouter);

    app.use('/api/transaction', TransactionRouter);

    app.use('/api/account', AccountRouter);

    app.use('/api/auth', AuthRouter);
    
    
} 

module.exports = route;