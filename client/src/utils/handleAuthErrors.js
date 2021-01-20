const handleAuthErrors = (err, setErrors) => {
    if (err.response && err.response.data.response) {
        if (err.response.status === 400) {
            const errors = {};
            err.response.data.response.forEach(param => {
                errors[param] = 'Invalid ' + param;
            });
            setErrors(errors);
        } else if (err.response.status === 401) {
            setErrors({password: 'Invalid password'});
        } else if (err.response.status === 404) {
            setErrors({email: 'User with email not found'});
        } else if (err.response.status === 409) {
            setErrors({email: 'Email already in use'});
        }
    }
};

export default handleAuthErrors;
