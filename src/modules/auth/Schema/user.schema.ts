import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../interface/user.interface';

export const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
      default: null,
    },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.pre('save', function (next) {
  if (!this.password) {
    next();
  }

  // Make sure not to rehash pwd if already hashed
  if (!this.isModified('password')) return next();

  // Generate a salt and use it to hash the user
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = async function (attempt) {
  try {
    const isMatch = await bcrypt.compare(attempt, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err.message);
  }
};
