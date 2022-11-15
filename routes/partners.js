const router = require("express").Router();
const partner = require("../controllers/partner.controller");
const auth = require("../lib/auth");
const authPartner = require("../lib/auth-partner");

router.get("/", auth, partner.findAll); // auth admin
router.get("/:id", auth, partner.findOne); // auth admin

router.post("/", auth, partner.create); // auth admin

router.delete("/:id", auth, partner.delete); // auth admin
router.put("/:id", auth, partner.update); // auth admin
router.get("/token/:id", auth, partner.createToken); // auth admin

module.exports = router;
