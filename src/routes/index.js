const {Router} = require('express');
const {
    errorHandler
} = require('./middleWares');

const Logger = require('../helpers/logger');

const localRoute = router => {
    router.get('/', async (req, res) => {
        res.render('home');
    });
    return router;
};

class Routes {
    static configure(app) {
        app.use('/', localRoute(Router()));
        Logger.info('Loading api...');
        app.use('/api', require('./api')(Router()));
        app.use(errorHandler);
    }
}

module.exports = Routes;
