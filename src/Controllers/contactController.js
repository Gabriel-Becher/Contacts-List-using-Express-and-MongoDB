const Contact = require("../Models/contactModel");

exports.index = (req, res) => {
  res.locals.user = req.session.user;
  res.render("contact");
};

exports.register = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.register();
  if (contact.errors.length > 0) {
    req.flash("errors", contact.errors);
    //console.log(contact.errors);
    return res.redirect("back");
  }
  req.flash("sucess", "Contact created successfully");
  res.redirect("/");
};

exports.edit = async (req, res) => {
  res.locals.user = req.session.user;
  const contato = await Contact.loadInfo(req.params.id);
  res.locals.contato = contato;
  res.render("contactedit");
};

exports.update = async (req, res) => {
  const contato = new Contact(req.body);
  await contato.update(req.params.id);
  if (contato.errors.length > 0) {
    req.flash("errors", contato.errors);
    return res.redirect("back");
  }
  res.redirect("/");
};

exports.load = async (req, res, next) => {
  const contatos = await Contact.loadContacts(req.session.user);
  res.locals.contatos = contatos;
  next();
};

exports.delete = async (req, res) => {
  await Contact.delete(req.params.id);
  res.redirect("back");
};
