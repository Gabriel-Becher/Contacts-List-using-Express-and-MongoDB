exports.index = (req, res) => {
  if (1) {
    res.render("login");
    return;
  }
  res.render("home");
};

exports.home = (req, res) => {
  res.render("home");
};
