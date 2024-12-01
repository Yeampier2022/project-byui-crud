const passport = require("passport");

const routes = require("express").Router();
routes.get("/", (req, res) => {
  res.send("Hello World");
});

routes.use("/api-doc", require("./swagger"));

routes.use("/employess", require("./employees"));

routes.get("/login", passport.authenticate("github"), (req, res) => {
  res.redirect("/api-doc");

});

routes.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    req.session.destroy();
    res.redirect("/");
  });
});

module.exports = routes;
