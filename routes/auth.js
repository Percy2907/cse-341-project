const express = require('express');
const passport = require('passport');
const router= express.Router();

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

router.get("/login", passport.authenticate("github", {scope: ["profile", "email"]}));

router.get('/logout', function(req, res, next) {

  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});

router.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged Out"
  );
});

module.exports = router;