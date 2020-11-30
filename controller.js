'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');
const md5 = require('md5');
const { connect } = require('./koneksi');

exports.index = function(req, res){
    response.ok("Aplikasi REST API Berjalan", res)
}

exports.getMahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

exports.getMahasiswaId = function(req, res){
    let id_mahasiswa = req.params.id_mahasiswa;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id_mahasiswa],
    function(error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
}

//POST DATA
exports.addMahasiswa = function(req, res){
    var nama = req.body.nama;
    var nomor_telepon = req.body.nomor_telepon;
    var nim = req.body.nim;

    console.log(req.body)

    connection.query("INSERT INTO mahasiswa (nama,nomor_telepon,nim) VALUES (?, ?, ?)",
        [nama, nomor_telepon, nim],
        function(error, rows, fields){
            if(error){
                console.log(error)
            } else {
                response.ok("Berhasi Menambahkan Data!", res)
            }
    });
}

exports.editMahasiswa = function(req, res){
    var id_mahasiswa = req.body.id_mahasiswa
    var nama = req.body.nama;
    var nomor_telepon = req.body.nomor_telepon;
    var nim = req.body.nim;

    connection.query('UPDATE mahasiswa SET nama=?, nomor_telepon=?, nim=? WHERE id_mahasiswa=?', [nama, nomor_telepon, nim, id_mahasiswa],
        function(error, rows, fields){
            if(error){
                console.log(error)
            } else {
                response.ok("Berhasil Mengupdate Data!!", res)
            }
    });
}

exports.deleteMahasiswa = function(req, res){
    var id_mahasiswa = req.body.id_mahasiswa
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id_mahasiswa],
        function(error, rows, fields){
            if(error){
                console.log(error)
            } else {
                response.ok("Berhasil Menghapus Data!", res)
            }
        });
}

exports.tampilGroupMatakuliah = function(req, res){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.nomor_telepon, mata_kuliah.matakuliah, mata_kuliah.sks FROM krs JOIN mata_kuliah JOIN mahasiswa WHERE krs.id_matakuliah = mata_kuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function(error, rows, fields){
            if(error){
                console.log(error)
            } else {
                // console.log("req", req)
                // console.log("res", res)
                response.oknested(rows, res)
            }
        });
}

