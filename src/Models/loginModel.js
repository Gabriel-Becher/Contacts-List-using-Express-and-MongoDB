const mongoose = require("mongoose");
const { emailValidator } = require("../Validators/userValidator");
const res = require("express/lib/response");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

const loginModel = mongoose.model("login", loginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async checkExistence() {
    return loginModel.findOne({ email: this.body.email });
  }

  async login() {
    this.valida();
    if (this.errors.length != 0) {
      return;
    }
    const registro = await this.checkExistence();
    if (registro == null) {
      this.errors.push("User does not exist");
      return;
    }
    if (registro.senha !== this.body.senha) {
      this.errors.push("Wrong password");
      return;
    }
    this.user = registro.email;
    return 1;
  }

  async register() {
    this.valida();
    if (this.errors.length != 0) {
      return;
    }
    const registro = await this.checkExistence();
    if (registro == null) {
      this.user = await loginModel.create(this.body);
      await this.user.save();
      return;
    } else {
      this.errors.push("User already exists");
      return;
    }
  }

  valida() {
    this.cleanUp();
    const { error, value } = emailValidator.validate({
      email: this.body.email,
    });
    if (error) this.errors.push("Invalid email");
    if (this.body.senha.length < 8) this.errors.push("Invalid password");
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      senha: this.body.senha,
    };
  }
}

module.exports = Login;
