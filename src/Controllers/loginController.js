const Login = require("../Models/loginModel");

exports.register = async (req, res) => {
  const login = new Login(req.body);
  login.register();
  res.send("Register");
};

exports.login = (req, res) => {
  res.send("Login");
};
