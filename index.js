require("dotenv").config();
<<<<<<< HEAD
=======

>>>>>>> 62ab532269b9e1feca8474d62055b8b60614af87
const http = require("http");
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const socket = require("socket.io");
<<<<<<< HEAD
const myIo = require("./server/sockets/io");
=======
const myIo = require("./io");
>>>>>>> 62ab532269b9e1feca8474d62055b8b60614af87

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
