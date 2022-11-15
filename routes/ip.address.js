const router = require("express").Router();
const IPAddress = require("../controllers/ip.address.controller");
const auth = require("../lib/auth-admin");

router.get("/", auth, IPAddress.findAll); // auth admin
router.get("/:id", auth, IPAddress.findOne); // auth admin

router.post("/", auth, IPAddress.create); // auth admin

router.delete("/:id", auth, IPAddress.delete); // auth admin
router.put("/:id", auth, IPAddress.update); // auth admin

module.exports = router;
