exports.index = (req, res) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    res.render("home");
  } else {
    res.render("login");
  }
};

exports.home = (req, res) => {
  res.render("home");
};
