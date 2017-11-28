var express = require('express');
var pug = require('pug');
var bodyParser = require('body-parser');
var path = require('path');
var expressSession = require('express-session');
var route = require('./routes/routes.js');
var expressSession = require('express-session');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

var checkAuth = function(req, res, next){
    if(req.session.user && req.session.user.isAuthenticated){
        next();
    }
    else{
        res.redirect('/login');
    }
}

app.use(expressSession ({
    secret: 'ThisIsTheSecret',
    saveUninitialized: true,
    resave: true
}));

app.get('/', route.index);
app.get('/home', route.home);
app.get('/login', route.login);
app.get('/register', route.register);
app.get('/edit', checkAuth, route.edit);

app.post('/register', urlencodedParser, route.registerUser);
app.post('/login', urlencodedParser, route.loginUser);
app.post('/edit/:id', urlencodedParser, route.editUser);


app.listen(3000);