const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/tests');
const validation = require('../middleware/validation');
const handleErrors = require('../middleware/errorHandler');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', isAuthenticated, handleErrors(usersController.getAll));
router.get('/:id',isAuthenticated, validation.ValidateIdParam, handleErrors(usersController.getSingle));
router.post('/', isAuthenticated, validation.SaveContact, handleErrors(usersController.createUser));
router.put('/:id', isAuthenticated, validation.SaveContact, handleErrors(usersController.updateUser));
router.delete('/:id',isAuthenticated, validation.ValidateIdParam, handleErrors(usersController.deleteUser));

module.exports = router;