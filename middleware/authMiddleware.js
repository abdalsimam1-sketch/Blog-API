import { UnauthorizedError } from "../errors/errors.js";
import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnauthorizedError("Access denied");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID };
    next();
  } catch (error) {
    throw new UnauthorizedError("Access denied");
  }
};
