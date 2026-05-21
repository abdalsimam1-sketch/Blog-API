import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  constructor(message, status) {
    super(message, status);
    this.status = status;
  }
}
class BadRequestError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
class NotFoundError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export { CustomError, BadRequestError, NotFoundError, UnauthorizedError };
