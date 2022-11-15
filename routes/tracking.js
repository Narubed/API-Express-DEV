const router = require("express").Router();
const tracking = require("../controllers/tracking.controller");
const auth = require("../lib/auth-partner");

router.post("/", auth, tracking.findTracking);
router.post("/purchase/", auth, tracking.findPurchase);

module.exports = router;
