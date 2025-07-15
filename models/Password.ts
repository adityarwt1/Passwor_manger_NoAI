import mongoose, { Document, Schema } from "mongoose";

interface Password extends Document {
  username: string;
  plateform: string;
  password: string;
}

const PasswordSchema: Schema<Password> = new Schema({
  username: {
    type: String,
  },
  plateform: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Password =
  mongoose.models.Password ||
  mongoose.model<Password>("Password", PasswordSchema);
export default Password;
