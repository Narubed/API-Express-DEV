const router = require("express").Router();
const ShippopWeb = require("../controllers/web.hook.controller/shipop.controller");

router.post("/general/shippop/", ShippopWeb.update);

module.exports = router;
