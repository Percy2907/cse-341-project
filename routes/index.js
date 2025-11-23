const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/contacts", require("./contacts"));
router.use("/companies", require("./companies"));
router.use("/", require("./swagger")); 
router.use("/", require("./auth"))

module.exports = router;
