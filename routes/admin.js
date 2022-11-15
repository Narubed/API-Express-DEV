const router = require("express").Router();
const admins = require("../controllers/admin.controller");
const authAdmin = require("../lib/auth-admin");
router.post("/",authAdmin, admins.create);
router.get("/me/", authAdmin, admins.findMe);

router.get("/", authAdmin, admins.findAll);
router.get("/:id", authAdmin, admins.findOne);
router.get("/email/:id", authAdmin, admins.findByEmail);

router.delete("/:id", authAdmin, admins.delete);
router.put("/:id", authAdmin, admins.update);

module.exports = router;
