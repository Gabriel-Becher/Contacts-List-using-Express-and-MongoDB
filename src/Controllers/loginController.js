const Login = require("../Models/loginModel");

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      //console.log(req.session);
      return res.redirect("back");
    }
    req.flash("sucess", "Account created successfully");
    req.session.save(() => {
      return res.redirect("back");
    });
  } catch (e) {
    return res.render("404");
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
    } else {
      req.session.user = login.user;
      res.locals.user = login.user;
      //console.log(req.session);
      return res.redirect("/");
    }
  } catch (e) {
    //console.log(e);
    return res.render("404");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
