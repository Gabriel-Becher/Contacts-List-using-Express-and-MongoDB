const Contact = require("../");

exports.index = (req, res) => {
  res.locals.user = req.session.user;
  res.render("contact");
};

exports.register = (req, res) => {
  console.log("AAA");
  res.redirect("/");
};
