const { ProductController } = require('../../controllers');


module.exports = router => {
    router.get('/', ProductController.getAll);
    router.get('/:id', ProductController.getById);
    router.post('/', ProductController.addProduct);
    router.put('/:id', ProductController.updateProduct);
    router.delete('/:id', ProductController.deleteProduct);
    router.get('/productRandom', ProductController.productRandom);
    return router;
};