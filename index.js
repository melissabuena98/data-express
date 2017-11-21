var express = require('express');
var pug = require('pug');
var bodyParser = require('body-parser');
var path = require('path');
var expressSession = require('express-session');
var route = require('./routes/routes.js');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', route.index);
app.get('/login', route.login);

app.listen(3000);