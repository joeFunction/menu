require("dotenv").config();
const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const authController = require("./controller/auth-controller");
const userController = require("./controller/user-controller");
const historyController = require("./controller/history-controller");
const menu = require("./controller/menu-controller");

////////
const authorController = require("./controller/author-controller");
const postController = require("./controller/post-controller");
///////

const db = require("./models");
const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'projecttwo_db',
      database: 'blogger_db'
  });
}

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

app.use(authController);
app.use(userController);
app.use(historyController);
app.use(menu);
app.use(authorController);
app.use(postController)

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
const startServer = async () => {
  await db.sequelize.sync(syncOptions);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
    );
  });
};

startServer();

