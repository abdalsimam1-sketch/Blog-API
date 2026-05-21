import { StatusCodes } from "http-status-codes";
import {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from "../errors/errors.js";
export const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error instanceof CustomError) {
    return res.status(error.status).json({ msg: error.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Internal server error" });
};
