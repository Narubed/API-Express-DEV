const router = require("express").Router();
const CutAround = require("../controllers/cut.around.controller");
const auth = require("../lib/auth-admin");

router.get("/partner/:id", CutAround.findByPartner);

router.get("/", auth, CutAround.findAll); // auth admin
router.get("/:id", auth, CutAround.findOne); // auth admin

router.post("/", auth, CutAround.create); // auth admin

router.delete("/:id", auth, CutAround.delete); // auth admin
router.put("/:id", auth, CutAround.update); // auth admin

module.exports = router;
