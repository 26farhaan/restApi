var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

router.get('/api/v1/rahasia', verifikasi(), auth.halamanRahasia);

let date = new Date()

module.exports = router;