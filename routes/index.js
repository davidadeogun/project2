const router = require('express').Router();
router.use('/', require('./swagger'));


router.get('/', (req, res) => {
    res.send('Welcome to the Users API!If you know the specific endpoints, you can use them to get data.');
});

router.use('/tests', require('./tests'));
router.use('/blog', require('./blog'));

module.exports = router;