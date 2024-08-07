exports.index = (req, res, next) => {
  res.render("entry");
};

exports.login = (req, res, next) => {
  res.locals.session = req.body;
  next();
};

exports.register = (req, res, next) => {
  res.send(req.body);
};
