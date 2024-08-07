const router = require("express").Router();
const homeController = require("./src/Controllers/homeController");
const entryController = require("./src/Controllers/entryController");

const test = (req, res) => {
  res.send("bah");
};

router.get("/", entryController.index);
router.get("/home", homeController.index);
router.post("/login", entryController.login, homeController.index);
router.post("/register", entryController.register);

module.exports = router;
