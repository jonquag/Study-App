const { GeneralError } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).send({
            status: 'Error',
            response: err.response,
        });
    } else {
        next();
    };
}

module.exports = handleErrors;
