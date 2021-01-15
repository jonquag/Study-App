const { GeneralError } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {
    console.log(err)
    if (err instanceof GeneralError) {
        res.status(err.getCode()).send({
            status: 'error',
            response: err.response,
        });
    } else {
        next();
    };
}

module.exports = handleErrors;
