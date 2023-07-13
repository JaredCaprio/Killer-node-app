const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

//Enable Cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Killer Node App</h1>");
});

app.get("/users", (req, res) => {
  res.json([
    { name: "bob", age: 59, id: 2 },
    { name: "Tommy", age: 69, id: 1 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
