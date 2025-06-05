import mongoose, { Collection } from "mongoose";

const configSchema = mongoose.Schema(
  {
    sameamtpending: {
      type: Boolean,
      default: false,
    },
    successRetry: {
      type: Number,
      default: 60,
    },
    numberOfApiRoutes: {
      type: Number,
      default: 2,
    },
    addbalanceRetry: {
      type: Number,
    },
  },
  {
    Collection: "SiteConfig",
  },
  { timestamps: true }
);

export default mongoose.models.SiteConfig ||
  mongoose.model("SiteConfig", configSchema);
