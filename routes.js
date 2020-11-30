'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/mahasiswa')
        .get(jsonku.getMahasiswa);

    app.route('/mahasiswa/:id_mahasiswa')
        .get(jsonku.getMahasiswaId);

    app.route('/tambah')
        .post(jsonku.addMahasiswa);

    app.route('/edit')
        .put(jsonku.editMahasiswa);

    app.route('/delete')
    .delete(jsonku.deleteMahasiswa);

    app.route('/matakuliahgroup')
    .get(jsonku.tampilGroupMatakuliah);
    
}