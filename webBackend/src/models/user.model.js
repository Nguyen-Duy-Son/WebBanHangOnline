const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide your userName!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password!"],
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number",
          );
        }
      },
      private: true, // used by the toJSON plugin
      select: false,
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if username is taken
 * @param {string} userName - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUsernameTaken = async function (userName, excludeUserId) {
    const user = await this.findOne({ userName, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 7);
        }
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
