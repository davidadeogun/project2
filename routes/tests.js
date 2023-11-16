const express = require('express');
const router = express.Router();

const usersController = require('../controllers/tests');
const validation = require('../middleware/validation');
const handleErrors = require('../middleware/errorHandler');

router.get('/',  handleErrors(usersController.getAll));
router.get('/:id', validation.ValidateIdParam, handleErrors(usersController.getSingle));
router.post('/', validation.SaveContact, handleErrors(usersController.createUser));
router.put('/:id',  validation.SaveContact, handleErrors(usersController.updateUser));
router.delete('/:id', validation.ValidateIdParam, handleErrors(usersController.deleteUser));

module.exports = router;