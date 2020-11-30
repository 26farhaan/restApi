const express = require('express');
const bodyParser = require('body-parser')

var morgan = require('morgan');
const app = express();

//parse aplication
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes

const routes  = require('./routes');
routes(app);

//Daftar routes dari index
app.use('/auth', require('./middleware'));

 app.listen(8000, () => {
     console.log(`Server started on 8000`);
 });