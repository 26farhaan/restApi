var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const conn = require('../koneksi');

//controller register

exports.registrasi = function(req, res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    console.log(post)

    var query = 'SELECT email FROM ?? WHERE ??=?';
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        } else {
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"],
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error)
                    } else {
                        response.ok("Berhasil menambahkan data user baru !", res);
                    }
                });
            } else {
                response.ok("Email sudah terdaftar!", res);
            }
        }
    });
}

exports.login = function(req, res){
    var post = {
        password : req.body.password,
        email : req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        } else {
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 3000
                });
                id_user = rows[0].id_user;

                var data = {
                    id_user: id_user,
                    akses_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"]

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error)
                    } else {
                         res.json({
                             success:true,
                             message:'Token JWT tergenerate',
                             token:token,
                             currUser: data.id_user
                         });
                    }
                });
            } else {
                 res.json({
                     "error" : true, "Message": "Email atau password Salah"
                 });
            }
        }
    });
}

exports.halamanRahasia = function(req, res){
    response.ok("Halaman ini hanya untuk user dengan role 2", res)
}