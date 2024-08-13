exports.errorMiddleware = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  next();
};
