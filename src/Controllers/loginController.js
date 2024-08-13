const Login = require("../Models/loginModel");

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
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
