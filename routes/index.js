

const AuthRouter = require ('./authRouters');
function route(app) {
    app.use('/api/auth', AuthRouter);
    
    
} 

module.exports = route;