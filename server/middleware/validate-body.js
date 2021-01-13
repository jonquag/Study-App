//Middleware for validating contents of the req body 
//Add validation to a route:
//  1) Create a validation chain
//  2) Include in module.exports
//  3) Import into app.js and include as middleware in route

const { body, validationResult } = require('express-validator/check');

validate_entry = [
  body('email')
    .exists()
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password')
    .exists()
    .isLength({ min: 7 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ response: "Missing or invalid field(s)" });
    }
    next();
  }
];

module.exports = {
  entry: validate_entry,
};
