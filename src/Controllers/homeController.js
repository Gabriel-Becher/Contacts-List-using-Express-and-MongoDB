exports.index = (req, res) => {
  if (!res.locals.session) {
    res.redirect("/");
  } else {
    res.render("index");
  }
};
