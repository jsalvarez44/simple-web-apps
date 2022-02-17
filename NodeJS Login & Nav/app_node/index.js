const express = require("express");
const session = require("express-session");
const path = require("path");
let fs = require("fs");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/auth", function (request, response) {
  let username = request.body.username;
  let password = request.body.password;

  fs.readFile("usuarios.txt", "utf-8", (error, data) => {
    if (error) throw error;
    var dataArray = data.split("\n");

    for (let i = 0; i < dataArray.length - 1; i++) {
      var temp = dataArray[i].split(" ");
      var temp_user = temp[2];
      var temp_password = temp[3];

      if (username === temp_user && password === temp_password) {
        request.session.loggedin = true;
        fs.writeFile("activeUser.txt", username, function (error) {
          if (error) throw error;
        });
        response.redirect("/home");
        return;
      }
    }
    response.redirect("login.html");
    response.end();
  });
});

app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("home.html");
  } else {
    response.redirect("login.html");
  }
  response.end();
});

app.get("/create", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("create.html");
  } else {
    response.redirect("login.html");
  }
  response.end();
});

app.get("/modify", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("modify.html");
  } else {
    response.redirect("login.html");
  }
  response.end();
});

app.get("/delete", function (request, response) {
  if (request.session.loggedin) {
    response.redirect("delete.html");
  } else {
    response.redirect("login.html");
  }
  response.end();
});

app.post("/search", function (request, response) {
  let user = request.body.search;

  var str = "None";

  fs.readFile("usuarios.txt", "utf-8", (error, data) => {
    if (error) throw error;
    var dataArray = data.split("\n");

    for (let i = 0; i < dataArray.length - 1; i++) {
      var temp = dataArray[i].split(" ");
      var temp_user = temp[2];
      if (user === temp_user) {
        str = dataArray[i];
      }
    }

    fs.writeFile("temp.txt", str, function (error) {
      if (error) throw error;
    });

    response.redirect("search.html");
    response.end();
  });
});

app.get("/exit", function (request, response) {
  response.redirect("login.html");
  response.end();
});

app.post("/createUser", function (request, response) {
  let name = request.body.name;
  let lastName = request.body.lastName;
  let user = request.body.user;
  let password = request.body.password;
  let email = request.body.email;

  var str =
    name + " " + lastName + " " + user + " " + password + " " + email + "\n";

  fs.appendFile("usuarios.txt", str, function (error) {
    if (error) throw error;
    response.redirect("create.html");
  });
});

app.post("/modifyUser", function (request, response){
  let name = request.body.name;
  let lastName = request.body.lastName;
  let user = request.body.user;
  let password = request.body.password;
  let email = request.body.email;

  var str = "";

  fs.readFile("usuarios.txt", "utf-8", (error, data) => {
    if (error) throw error;
    var dataArray = data.split("\n");

    for (let i = 0; i < dataArray.length - 1; i++) {
      var temp = dataArray[i].split(" ");
      var temp_user = temp[2];
      if (user !== temp_user) {
        str += dataArray[i] + "\n";
      } else {
        str += name + " " + lastName + " " + user + " " + password + " " + email + "\n";
      }
    }

    fs.writeFile("usuarios.txt", str, function (error) {
      if (error) throw error;
    });

    response.redirect("modify.html");
    response.end();
  });
});

app.post("/deleteUser", function (request, response) {
  let user = request.body.user;

  var str = "";

  fs.readFile("usuarios.txt", "utf-8", (error, data) => {
    if (error) throw error;
    var dataArray = data.split("\n");

    for (let i = 0; i < dataArray.length - 1; i++) {
      var temp = dataArray[i].split(" ");
      var temp_user = temp[2];
      if (user !== temp_user) {
        str += dataArray[i] + "\n";
      }
    }

    fs.writeFile("usuarios.txt", str, function (error) {
      if (error) throw error;
    });

    response.redirect("delete.html");
    response.end();
  });
});

var port = 8000;
app.listen(port);
console.log(`El servidor corre en: http://localhost:${port}/`);
