const mongoose = require("mongoose");
const { userValidator } = require("../Validators/userValidator");

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

  register() {
    this.valida();
  }

  valida() {
    this.cleanUp();
    const { error, value } = userValidator.validate(this.body);
    if (error) {
      this.errors.push(error.message);
      return;
    }
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
