import mongoose from "mongoose";

const Transaction = mongoose.Schema(
  {
    number: String,
    amount: Number,
    operator: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Operator",
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
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
      ref: "Api",
    },
    remark: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", Transaction);
