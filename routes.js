const router = require("express").Router();
const homeController = require("./src/Controllers/homeController");
const loginController = require("./src/Controllers/loginController");
const contactController = require("./src/Controllers/contactController");
const { loginRequired } = require("./src/Middlewares/globalmiddlewares");

//homepage route
router.get("/", contactController.load, homeController.index);
//login routes
router.post("/login/login", contactController.load, loginController.login);
router.post("/login/register", loginController.register);
router.get("/login/logout", loginController.logout);
//contact create and edit routes
router.get("/contact", loginRequired, contactController.index);
router.post("/contact/register", loginRequired, contactController.register);
router.get("/contact/edit/:id", loginRequired, contactController.edit);
router.post("/contact/edit/:id", loginRequired, contactController.update);
//delete route
router.get("/contact/delete/:id", loginRequired, contactController.delete);
module.exports = router;
