const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  _id: {
    type: String,
    required: true,
  },
});

const contactModel = mongoose.model("contact", contactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
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
      name: this.body.name,
      phoneNumber: this.body.phoneNumber,
    };
  }
}
