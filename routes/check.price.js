const router = require("express").Router();
const checkPrice = require("../controllers/check.price.controller");
const authPartner = require("../lib/auth-partner");

router.post("/", authPartner, checkPrice.getPrice);

module.exports = router;
