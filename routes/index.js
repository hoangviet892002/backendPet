
const HiepsiRouter = require ('./Product/hiepsi');
const LienminhRouter = require ('./Product/lienminh');
const NgocrongRouter = require ('./Product/ngocrong');
const OrderRouter = require ('./Shopacc/Order');
const Transaction_momoRouter = require ('./Shopacc/Transaction_momo');
const TransactionRouter = require ('./Shopacc/Transaction');
const AccountRouter = require ('./Users/Account');

function route(app) {
    app.use('/api/hiepsi', HiepsiRouter);

    app.use('/api/lienminh', LienminhRouter);

    app.use('/api/ngocrong', NgocrongRouter);

    app.use('/api/order', OrderRouter);

    app.use('/api/transactionmomo', Transaction_momoRouter);

    app.use('/api/transaction', TransactionRouter);

    app.use('/api/account', AccountRouter);
    
    
} 

module.exports = route;