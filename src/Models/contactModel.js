const mongoose = require("mongoose");
const { emailValidator } = require("../Validators/userValidator");
const contactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: null,
  },
  email: {
    type: String,
    required: false,
    default: null,
  },
  user: {
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

  static async loadContacts(userEmail) {
    const contacts = await contactModel.find({ user: userEmail });
    return contacts;
  }

  static async loadInfo(id) {
    const contact = await contactModel.findById(id);
    return contact;
  }

  async update(id) {
    this.valida();
    await this.verifyContact(id);
    if (this.errors.length > 0) return;
    const contact = await contactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
    return contact;
  }

  async verifyContact(id) {
    let contact = await contactModel.findOne({
      contactName: this.body.contactName,
      user: this.body.user,
    });
    let contact1 = await contactModel.findOne({
      phoneNumber: this.body.phoneNumber,
      user: this.body.user,
    });
    let contact2 = await contactModel.findOne({
      email: this.body.email,
      user: this.body.user,
    });
    if (contact) contact = contact._id.toString() === id ? null : contact;
    if (contact1) contact1 = contact1._id.toString() === id ? null : contact1;
    if (contact2) contact2 = contact2._id.toString() === id ? null : contact2;
    if (
      contact ||
      (this.body.phoneNumber && contact1) ||
      (this.body.email && contact2)
    ) {
      this.errors.push("Contact already exists");
    }
  }

  static async delete(id) {
    const contact = await contactModel.findOneAndDelete({ _id: id });
    return contact;
  }

  async register() {
    this.valida();
    await this.verifyContact();
    if (this.errors.length > 0) return;
    try {
      this.contact = await contactModel.create(this.body);
      await this.contact.save();
      //console.log(this.contact);
    } catch (error) {
      //console.log(error);
    }
  }

  valida() {
    this.cleanUp();
    if (!this.body.contactName) this.errors.push("Name is a required field");
    if (!this.body.email && !this.body.phoneNumber)
      this.errors.push("At least one contact field is required");
    if (this.body.email) {
      const { error, value } = emailValidator.validate({
        email: this.body.email,
      });
      if (error) this.errors.push("Invalid email");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    let capitalizedName = this.body.contactName.split(" ");
    let newName = "";
    for (let element of capitalizedName) {
      element = element.toLowerCase();
      newName = newName.concat(
        element.charAt(0).toUpperCase() + element.slice(1) + " "
      );
      //console.log(newName);
    }
    newName = newName.trim();
    //console.log(newName);
    this.body = {
      contactName: newName,
      phoneNumber: this.body.phoneNumber
        ? this.body.phoneNumber.replace(/\D/g, "")
        : "",
      email: this.body.email,
      user: this.body.user,
    };
  }
}

module.exports = Contact;
