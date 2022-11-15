const router = require("express").Router();
const booking = require("../controllers/booking.controller");
const confirmBook = require("../controllers/booking.controller/confirm.booking.controller");
const cancelBook = require("../controllers/booking.controller/cancal.booking.controller");
const updateWeight = require("../controllers/booking.controller/update.weight.booking.controller");
const authPartner = require("../lib/auth-partner");

router.post("/confirm/", authPartner, confirmBook.confirm);
router.post("/cancel/", authPartner, cancelBook.cancel);
router.post("/update-weight/", authPartner, updateWeight.update);

router.post("/", authPartner, booking.postBook);

module.exports = router;
