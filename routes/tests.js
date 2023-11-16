const express = require('express');
const router = express.Router();

const usersController = require('../controllers/tests');
const validation = require('../middleware/validation');
const handleErrors = require('../middleware/errorHandler');

router.get('/', handleErrors(usersController.getAll));
router.get('/:id', handleErrors(usersController.getSingle));
router.post('/', handleErrors(usersController.createUser));
router.put('/:id', validation.SaveContact,  handleErrors(usersController.updateUser));
router.delete('/:id', handleErrors(usersController.deleteUser));

module.exports = router;