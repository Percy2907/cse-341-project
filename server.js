const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) console.error(err);
  else app.listen(port, () => console.log(`Server running on port ${port}`));
});