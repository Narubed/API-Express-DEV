const router = require("express").Router();
const codexpress = require("../controllers/cod.express.controller");
const auth = require("../lib/auth-admin");

router.get("/", auth, codexpress.findAll); // auth admin
router.get("/:id", auth, codexpress.findOne); // auth admin

router.post("/", auth, codexpress.create); // auth admin

router.delete("/:id", auth, codexpress.delete); // auth admin
router.put("/:id", auth, codexpress.update); // auth admin

module.exports = router;
