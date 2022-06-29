module.exports = router => {
    router.get('/', async (req, res) => {
        res.render('home');
    });
    return router;
};