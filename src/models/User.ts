import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  customerStripeId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
