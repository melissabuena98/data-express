var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var bcrypt = require('bcrypt-nodejs');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var userSchema = mongoose.Schema({
   username: String,
   password: String,
   email: String,
   age: String,
   answers: Array,
   type: String
});

var User = mongoose.model('User_Collection', userSchema);

exports.index = function (req, res) {
    User.find(function (err, user){
        res.render('index', {
            userList: user
        });
    });  
};

exports.home = function (req, res){
    User.findById(req.session.user.userID, function (err, user) {
        if (err) return console.error(err);
        res.render('home',{
            user: user
        });
    });
};

exports.login = function (req, res) {
    res.render('login');
};

exports.loginUser = function(req, res){
    User.findOne({'username': req.body.username}, function(err, user){
        if(err){
            console.log(err);
            
        }
        else{
            if(!user){
                console.log("User does not exist. Please register!");
                res.redirect('/register');
            }
            else if(req.body.password != null){
                var pw = req.body.password;
                if(bcrypt.compareSync(pw, user.password)){
                    req.session.user={
                        userID: user._id,
                        isAuthenticated: true,
                        userType: user.type,
                        username: user.username
                    };
                    res.redirect('/home');
                }
                else{
                    console.log("Incorrect Password for this account!");
                    res.redirect('/login');
                    }
            }
        }
    });
};

exports.register = function (req, res) {
    res.render('register');
};

exports.registerUser = function (req, res){
    var hashedPW = bcrypt.hashSync(req.body.password);
    var user = new User({
        username: req.body.username,
        password:hashedPW,
        email: req.body.email,
        age: req.body.age,
        answers: [req.body.degree, req.body.region, req.body.gradYear],
        type: req.body.accType
    });

    user.save(function (err, user){
        if(err) return console.error(err);
        console.log(req.body.username + ' was added!');
        console.log("TYPE:" + req.body.accType);
    });
    res.redirect('/login');
};

exports.edit = function (req, res){
    User.findById(req.session.user.userID, function (err, user) {
        if (err) return console.error(err);
        res.render('edit',{
            user: user
        });
    });
};

exports.editUser = function (req, res){
    User.findById(req.session.user.userID, function (err, user){
        if(err) return console.error(err);
        user.username = req.body.username;
        user.email = req.body.email;
        user.age = req.body.age;
        user.answers = [req.body.degree, req.body.region, req.body.gradYear]
        user.save(function (err, user){
            if(err) return console.error(err);
            console.log(req.body.username + " info updated!");
        });
    });
    res.redirect('/home');
};

exports.manage = function (req, res){
    console.log(req.session.user.username);
    User.find(function (err, user){
    if (err) return console.error(err);
    res.render('manage', {
        userList: user,
        user: req.session.user
        });
    });

};

exports.delete = function (req, res){
    User.findByIdAndRemove(req.params.id, function (err, user){
    if (err) return console.error(err);
    res.redirect('/home');
    });
}

exports.logout = function (req, res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("LOGGED OUT!");
            res.redirect('/');
        }
    });
}