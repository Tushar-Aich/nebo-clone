import mongoose, {Schema} from 'mongoose'
import { IUser } from '@/interfaces/interface'
import bcrypt from "bcryptjs"

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "UserName is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "UserName must not be less than 3 characters"],
      maxlength: [20, "UserName must not be more than 20 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "UserNames can only contain letters, numbers or underscores",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 characters"],
    },
    name: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isPasswordCorrect = await bcrypt.compare(candidatePassword, this.password)
  return isPasswordCorrect;
};

const UserModel: mongoose.Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;