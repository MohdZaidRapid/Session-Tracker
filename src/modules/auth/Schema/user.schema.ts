import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../interface/user.interface';

export const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  console.log(userObject.password);
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
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    throw new Error(err.message);
  }
};
