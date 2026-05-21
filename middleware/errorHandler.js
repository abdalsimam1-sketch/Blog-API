import { StatusCodes } from "http-status-codes";

export const errorHandler = (error, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
};
