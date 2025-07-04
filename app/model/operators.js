import mongoose from "mongoose";

const Operator = mongoose.Schema(
  {
    logo: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    opcode: {
      type: String,
      unique: true,
      required: true,
    },
    isfetchbill: {
      type: Boolean,
      default: false,
    },
    number_labeltext: {
      type: String,
    },
    mobile_length: {
      type: String,
    },
    amount_labletext:{
      type: String
    },
    amount_length:{
      type: String
    },
    providertype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderType",
    },
    api1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Api",
    },
    api2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Api",
    },
    api3: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Api",
    },
    api4: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Api",
    },
    api5: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Api",
    },
    planapi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Api",
    },
    isenabled: {
      type: Boolean,
      default: true,
    },
    denomination: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Operator || mongoose.model("Operator", Operator);
