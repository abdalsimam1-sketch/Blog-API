import { Router } from "express";
export const postRouter = Router();
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllMyPosts,
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  getOnePost,
} from "../controllers/postControllers.js";

//public routes
//get all routes even if not logged it
postRouter.get("/", getAllPosts);

//protected routes
//authorized routes
postRouter.post("/", authMiddleware, createPost);
//get all posts
postRouter.get("/myPosts", authMiddleware, getAllMyPosts);

//public
//get specific post
postRouter.get("/:id", getOnePost);

//protected
//edit post
postRouter.patch("/:id", authMiddleware, editPost);
//delete post
postRouter.delete("/:id", authMiddleware, deletePost);
