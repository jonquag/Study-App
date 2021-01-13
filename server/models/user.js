const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function(email) {
        const self = this;
        return new Promise(async function(resolve, reject) {
          await self.constructor.findOne({email})
          .exec(function(err, user) {
            if (err) {
                reject('Internal Error');
            } else if (user) {
                if (self.id === user.id) {
                    resolve(true);
                }
                reject(false);  
            }
            else {
                resolve(false);
            }
          });
        });
      },
      message: 'Email is taken',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
