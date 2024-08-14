const router = require("express").Router();
const homeController = require("./src/Controllers/homeController");
const loginController = require("./src/Controllers/loginController");
router.get("/", homeController.index);

router.post("/login/login", loginController.login);

router.post("/login/register", loginController.register);

router.get("/login/logout", loginController.logout);

module.exports = router;
