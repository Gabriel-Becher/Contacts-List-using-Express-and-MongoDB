const router = require("express").Router();
const homeController = require("./src/Controllers/homeController");
const loginController = require("./src/Controllers/loginController");
router.get("/", homeController.index);

router.get("/home", homeController.home);

router.post("/login/login", loginController.login);

router.post("/login/register", loginController.register);

module.exports = router;
