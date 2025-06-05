import mongoose from "mongoose";

const WalletLoad = mongoose.Schema(
  {
    by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    fromopening: {
      type: Number,
    },
    fromclosing: {
      type: Number,
    },
    toopening: {
      type: Number,
    },
    toclosing: {
      type: Number,
    },
    mode: {
        type: String,
        enum: ["UPI", "CREDIT CARD", "DEBIT CARD", "NETBANKING"],
    },
    type: {
        type: String,
        enum: ["CR", "DR"],
    },
    description: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.WalletLoad || mongoose.model("WalletLoad", WalletLoad);