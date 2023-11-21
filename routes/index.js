const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');


router.use("/", require("./swagger"));
router.use("/tests", require("./tests"));
router.use("/blog", require("./blog"));

/*router.get('/', (req, res) => {
  res.send('<a href="/login">Authenticate with Google</a>');
});*/

router.get('/', (req, res) => {
  res.render('index');
});

//set up a login route
router.get('/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});




module.exports = router;
