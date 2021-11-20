//handler message on unfouned pages
const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//handler messages on all kind of errors
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; //500 is a generally error
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

export { notFound, errorHandler };
