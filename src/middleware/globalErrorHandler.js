import StatusCodes from "http-status-codes";

const GlobalErrorHandler = (err, req, res, next) => {
  const message = err && err.message ? err.message : "Internal Server Error";
  const statusCode = err && err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ error: message,statusCode });
};

export default GlobalErrorHandler;