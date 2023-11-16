const express = require('express');
const router = express.Router();

const usersController = require('../controllers/tests');
const validation = require('../middleware/validation');
const handleErrors = require('../middleware/errorHandler');


//Rate limiting
//const rateLimit = require("express-rate-limit");
/*
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});*/
//router.use(apiLimiter);
// I already installed express-rate-limit


//router.get('/', passport.authenticate('provider'), handleErrors(usersController.getAll)); configured in the main server(app.js)
router.get('/',  handleErrors(usersController.getAll));
router.get('/:id', validation.ValidateIdParam, handleErrors(usersController.getSingle));
router.post('/', validation.SaveContact, handleErrors(usersController.createUser));
router.put('/:id',  validation.SaveContact, handleErrors(usersController.updateUser));
router.delete('/:id', validation.ValidateIdParam, handleErrors(usersController.deleteUser));

module.exports = router;