const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/contacts", require("./contacts"));
router.use("/companies", require("./companies"));
router.use("/", require("./swagger")); 
router.get("/login", passport.authenticate("github", {scope: ["profile", "email"]}));

router.get('/logout', function(req, res, next) {

  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      res.redirect("/");
    });
  });
});

module.exports = router;
