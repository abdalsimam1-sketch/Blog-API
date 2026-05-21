import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/errors.js";
import { User } from "../models/userModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnauthorizedError("Access denied");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }
  const comparePasswords = await user.comparePasswords(password);
  if (!comparePasswords) {
    throw new UnauthorizedError("Access denied, Wrong password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ username: user.username, token });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequestError("Please enter valid credentials");
  }
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    throw new BadRequestError("Email already exists, please use another one");
  }
  const user = await User.create({ username, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ username, token });
};
