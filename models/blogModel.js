import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog name is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    summary: {
      type: String,
      maxlength: 100,
    },
    tags: [{ type: String }],
    image: { type: String },
  },
  { timestamps: true },
);

export const Blog = mongoose.model("Blog", blogSchema);
