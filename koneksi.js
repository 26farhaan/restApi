var mysql = require('mysql');

//buat koneksi
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database : 'node_js'
});

conn.connect((err) => {
    if(err) throw err;
    console.log("Mysql Berhasil");
});

module.exports = conn;