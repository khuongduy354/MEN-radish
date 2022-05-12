import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatar: {
      exists: {
        type: Boolean,
        default: "false",
      },
      imageLink: {
        type: String,
        trim: true,
        default: "null",
      },
      imageId: {
        type: String,
        trim: true,
        default: "null",
      },
    },
    karmaPoints: {
      postKarma: {
        type: Number,
        default: 0,
      },
      commentKarma: {
        type: Number,
        default: 0,
      },
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    subscribedSubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subreddit",
      },
    ],
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
