import mongoose from "mongoose";

const Transaction = mongoose.Schema(
  {
    number: String,
    amount: String,
    operator: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },
    req_id: String,
    txn_id: String,
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    api: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Api",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", Transaction);
