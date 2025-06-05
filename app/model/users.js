import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isactive: {
      type: Boolean,
      default: true,
    },
    mobile: {
      type: Number,
      unique: true,
      required: true,
    },
    api_token: {
      type: String,
    },
    islocked: {
      type: Boolean,
      default: false,
    },
    balance: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    location: String,
    pincode: Number,
    state: String,
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "APIUSER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);
