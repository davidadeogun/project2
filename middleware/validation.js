const Validator = require('validatorjs');
const mongoose = require('mongoose');

// Custom rule for date format
Validator.register('dateFormat', (value, requirement, attribute) => {
    return !value || value.match(/^\d{4}-\d{2}-\d{2}$/);
}, 'The :attribute does not match the format YYYY-MM-DD.');

const SaveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'dateFormat' // Optional but must match format if provided
    };
    const validation = new Validator(req.body, validationRule);

    if (validation.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors
        });
    } else {
        next();
    }
};



// Custom rule for MongoDB ObjectId
Validator.register('objectId', (value, requirement, attribute) => {
    return mongoose.Types.ObjectId.isValid(value);
}, 'The :attribute is not a valid MongoDB ObjectId.');

const ValidateIdParam = (req, res, next) => {
    const validationRule = {
        id: 'required|objectId',
    };
    const validation = new Validator(req.params, validationRule);

    if (validation.fails()) {
        res.status(400).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors
        });
    } else {
        next();
    }
};
module.exports = {
    SaveContact, ValidateIdParam
};



