require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const messages = require("./messages.js");

const app = express();
const POST = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/post", messages.onPost);
app.get("/userget", messages.onGet);

app.listen(POST, () => {
  console.log(`Server listening at http://localhost:${POST}`);
});
