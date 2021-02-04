const { GeneralError, NotFound, Unauthorized } = require('../utils/errors');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.passwordChange = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            error: errors.array(),
        });

    const { oldPassword, newPassword, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) throw new NotFound('No user found');

        const comparePassword = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!comparePassword)
            throw new Unauthorized('Unauthorized to change password');

        const newHashedPw = await bcrypt.hash(newPassword, 10);
        if (!newHashedPw) throw new GeneralError('Failed to hash password');

        user.password = newHashedPw;

        const response = await user.save();
        if (!response) throw new GeneralError('Failed saving user');

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
