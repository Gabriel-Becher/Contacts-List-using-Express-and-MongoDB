const router = require("express").Router();
const loginController = require("./src/Controllers/loginController");

router.get("/", loginController.index);

module.exports = router;
