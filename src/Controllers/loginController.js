const Login = require("../Models/loginModel");

exports.register = async (req, res) => {
  const login = new Login(req.body);
  await login.register();
  if (login.errors.length > 0) {
    req.flash("errors", login.errors);
    console.log(req.session);
    return res.redirect("back");
  }
  req.flash("sucess", "Account created successfully");
  return res.redirect("back");
};

exports.login = async (req, res) => {
  const login = new Login(req.body);
  await login.login();
  if (login.errors.length > 0) {
    req.flash("errors", login.errors);
    return res.redirect("back");
  } else {
    return res.render("home");
  }
  return;
};
