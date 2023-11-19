const User = require("./schema");



const registerValidation = {
  username: {
    notEmpty: {
      errorMessage: "User Name is required",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isStrongPassword: {
      errorMessage: "password should be min length of 10",
    },
  },

  email: {
    notEmpty: {
      errorMessage: "email is required",
    },
    isEmail: {
      errorMessage: "Please enter valid email",
    },
    custom: {
      options: async (value) => {
        const UserEmail = await User.findOne({ email: value });
        if (UserEmail) {
          throw new Error("email is already registered");
        }
        else{
        return true}
      },
    },
  },
};

module.exports = registerValidation;
