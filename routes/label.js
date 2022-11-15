const router = require("express").Router();
const checkPrice = require("../controllers/create.label.controller");
router.post("/", checkPrice.create);

module.exports = router;
