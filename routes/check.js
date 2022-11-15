const router = require("express").Router();
const checkTax = require("../controllers/check.tax.number/create.tax.cutaround.controller");

router.post("/tax/cut-around", checkTax.create);

module.exports = router;
