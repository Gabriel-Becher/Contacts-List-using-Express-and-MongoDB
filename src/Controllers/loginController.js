const { Login } = require("../Models/loginModel");

exports.register = (req, res) => {
  res.send("Register");
};

exports.login = (req, res) => {
  const login = new Login(req.body);
  login.register();
  res.send("Login");
};
