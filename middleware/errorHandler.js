// errorHandler.js
const handleErrors = fn => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
};

module.exports = handleErrors;
