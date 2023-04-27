import ErrorResponse from "./ErrorResponse.js";
import logging from "../../middlewares/logging.js";

const errorHandler = (err, req, res, next) => {
  // console.error(err);
  logging.log("error", err);

  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }
  return res
    .status(500)
    .json({ success: false, status: 500, message: "Something went wrong" });
};

export default errorHandler;