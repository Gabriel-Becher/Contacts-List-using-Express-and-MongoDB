exports.errorMiddleware = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.sucess = req.flash("sucess");
  next();
};
