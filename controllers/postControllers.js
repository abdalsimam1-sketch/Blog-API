import { NotFoundError } from "../errors/errors.js";
import { Blog } from "../models/blogModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllPosts = async (req, res) => {
  const posts = await Blog.find().populate("author", "username");
  res.status(StatusCodes.OK).json({ posts });
};

export const createPost = async (req, res) => {
  const createdBy = req.user.userID;
  const post = await Blog.create({ ...req.body, author: createdBy });
  res.status(StatusCodes.CREATED).json({ msg: "Success", post });
};
export const getAllMyPosts = async (req, res) => {
  const posts = await Blog.find({ author: req.user.userID }).populate(
    "author",
    "username",
  );
  res.status(StatusCodes.OK).json({ posts });
};

export const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await Blog.findOne({
    _id: id,
  }).populate("author", "username");
  if (!post) {
    throw new NotFoundError("Post not found");
  }
  res.status(StatusCodes.OK).json({ post });
};

export const editPost = async (req, res) => {
  const { id } = req.params;
  const post = await Blog.findOneAndUpdate(
    {
      author: req.user.userID,
      _id: id,
    },
    req.body,
    { new: true, runValidators: true },
  );
  if (!post) {
    throw new NotFoundError("Post not found");
  }
  res.status(StatusCodes.OK).json({ post });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Blog.deleteOne({ author: req.user.userID, _id: id });
  if (post.deletedCount === 0) {
    throw new NotFoundError("Post not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Post deleted successfully" });
};
