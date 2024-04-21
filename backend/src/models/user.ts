import mongoose from "mongoose";

export interface IUser extends mongoose.Schema {
  email: string;
  password: string;
  username: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
