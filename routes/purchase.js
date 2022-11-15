const router = require("express").Router();
const purchase = require("../controllers/purchase.controller");
const auth = require("../lib/auth-admin");

router.get("/purchase-courier", auth, purchase.findAll); // auth

module.exports = router;
