const express = require("express");
const router = express.Router();

router.use("/contacts", require("./contacts"));
router.use("/companies", require("./companies"));
router.use("/", require("./swagger"));

module.exports = router;