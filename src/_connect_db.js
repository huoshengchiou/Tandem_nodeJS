const mysql = require("mysql");
const bluebird = require("bluebird");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tandem"

  // for MAC PC USE
  // socketPath: "/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock"
});
db.on("error", event => {
  console.log(event);
});
db.connect();

bluebird.promisifyAll(db);

module.exports = db;
