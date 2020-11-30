const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req, rest, next){
        var tokenWithHeader = req.headers.authorization
        var role = req.body.role
        if(tokenWithHeader){
            var token = tokenWithHeader.split(` `)[1];
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:"Token tidak terdaftar"});
                } else {
                    if(role == 2){
                        req.auth = decoded;
                        next()
                    } else {
                        return rest.status(401).send({auth: false, message:"Gagal Mengotorisasi token anda"});
                    }
                }
            })
        } else {
            return rest.status(401).send({auth: false, message:"Token tidak tersedia!"});
        }
    }
}

module.exports = verifikasi;