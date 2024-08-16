const router = require("express").Router();
const homeController = require("./src/Controllers/homeController");
const loginController = require("./src/Controllers/loginController");
const contactController = require("./src/Controllers/contactController");
const { loginRequired } = require("./src/Middlewares/globalmiddlewares");

//homepage route
router.get("/", homeController.index);
//login routes
router.post("/login/login", loginController.login);
router.post("/login/register", loginController.register);
router.get("/login/logout", loginController.logout);
//contact create and edit routes
router.get("/contact", loginRequired, contactController.index);
router.post("/contact/register", loginRequired, contactController.register);

module.exports = router;
