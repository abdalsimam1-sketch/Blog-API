import { StatusCodes } from "http-status-codes";

export const routeNotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Route does not exist");
};
