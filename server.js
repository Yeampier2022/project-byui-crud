const express = require("express");
const mongodb = require("./database/database");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, z-Key"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/", require("./routes"));

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
