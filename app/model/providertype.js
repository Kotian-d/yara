import mongoose from "mongoose";

const ProviderType = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    isfetchbill:{
      type: Boolean,
      default: true,
    },
    successretry: {
      type: Number,
      default: 10,
    },
    isenabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ProviderType || mongoose.model("ProviderType", ProviderType);