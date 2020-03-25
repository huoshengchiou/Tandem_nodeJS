const mysql = require('mysql');
const bluebird = require('bluebird');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'community',
    // "socketPath": "/Applications/MAMP/tmp/mysql/mysql.sock"
    "socketPath": "/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock"



}, console.log('connected to database'));
db.on('error', (event)=>{
    console.log(error);
});
db.connect();

bluebird.promisifyAll(db);

module.exports = db;