const express = require("express");
const mongodb = require("./database/database");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");

  next();
});

app.use(cors({ methods: "GET, POST, PUT, DELETE, PATCH, UPDATE" }));
app.use(cors({ origin: "*" }));
app.use("/", require("./routes"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {

      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Loggend in as ${req.session.user.displayName}`
      : "Not logged in"
  );
});

app.get(
"https://project-byui-crud.onrender.com/auth/github/callback",
  //"/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-doc",
    session: false,
  }),

  function (req, res) {
    req.session.user = req.user;
    res.redirect("/");
  }
);
mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
