const ErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message: errorMessage,
    errorStack: err.stack || "No stack trace available",
  });
};

export default ErrorHandler;
