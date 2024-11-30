import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

interface IUser extends Document<mongoose.Types.ObjectId> {
  username: string;
  email: string;
  password: string;
}

interface IUserModel extends mongoose.Model<IUser> {
  signup(username: string, email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Signup method
userSchema.statics.signup = async (
  username: string,
  email: string,
  password: string
) => {
  //Validation
  if (!email || !password || !username) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email format");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    throw Error("Email already in use");
  }

  if (usernameExists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async (email: string, password: string) => {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw Error("Invalid email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid email or password");
  }

  return user;
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
