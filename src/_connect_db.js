const mysql = require("mysql");
const bluebird = require("bluebird");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
<<<<<<< HEAD
  database: "tandem",
=======
  database: "tandem"

>>>>>>> a9ca5b1bdbf3c9ac3575ee206726bcb815971136
  // for MAC PC USE
  // socketPath: "/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock"
});
db.on("error", event => {
  console.log(event);
});
db.connect();

bluebird.promisifyAll(db);

module.exports = db;
