const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const connectDb = require("./config/db");
const mongoose = require("mongoose");
const Trick = require("./models/Trick");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { ensureAuth } = require("./middleware/auth");

//json config
app.use(express.json());

//headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//Enable Cors
app.use(
  cors({
    origin: `${process.env.CLIENT_DOMAIN}`,
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
    exposedHeaders: ["set-cookie"],
  })
);
//db connection
connectDb();

//passport config
require("./config/passport")(passport);

app.set("trust proxy", 1);

//sessions middleware
app.use(
  session({
    secret: "foo",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      stringify: false,
    }),
    name: "killer-node-app",
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Killer Node App</h1>");
});

app.get("/tricks", async (req, res) => {
  const tricks = await Trick.find({});
  res.json(tricks);
});

//Auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: `${process.env.CLIENT_DOMAIN}/`,
  }),
  (req, res) => {
    console.log(req);
  }
);

//logout Route

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.json(false);
      return next(err);
    }
  });
  res.json(true);
});

app.get("/auth/check", (req, res) => {
  console.log(req.user, "Req.User");
  try {
    if (req.isAuthenticated()) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

//CRUD routes

app.post("/addTrick", async (req, res) => {
  try {
    console.log(req.body);
    const newTrick = await Trick.create(req.body);
    res.status(201).json({ mes: "trick added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error, bitch!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
