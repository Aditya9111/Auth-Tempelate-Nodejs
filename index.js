const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth.route");
const verifyAuthentication = require("./middlewares/auth.middleware");

const app = express();
const connectToDB = require("./db/db");
const url = process.env.DB_URL;

connectToDB(url);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome!",
  });
});

app.use("/auth", auth);

app.use(verifyAuthentication);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port 3001`));
