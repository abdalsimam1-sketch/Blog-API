import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/errors.js";
export const routeNotFound = (req, res, next) => {
  next(new NotFoundError("Route does not exist"));
};
