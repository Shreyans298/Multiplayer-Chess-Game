require("dotenv").config();

const http = require("http");
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const socket = require("socket.io");
const myIo = require("./io");

const app = express();
const server = http.Server(app);
const io = socket(server);
games = {};

myIo(io);

const Handlebars = handlebars.create({
  extname: ".html",
  partialsDir: path.join(__dirname, "..", "front", "views", "partials"),
  defaultLayout: false,
  helpers: {},
});

app.engine("html", Handlebars.engine);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "..", "front", "views"));
app.use(
  "/public",
  express.static(path.join(__dirname, "..", "front", "public"))
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/white", (req, res) => {
  res.render("moves", {
    color: "white",
  });
});
app.get("/black", (req, res) => {
  if (!games[req.query.code]) {
    return res.redirect("/?error=invalidCode");
  }

  res.render("moves", {
    color: "black",
  });
});
