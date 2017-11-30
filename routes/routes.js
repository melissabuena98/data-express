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
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
    var dateTime = date+' '+time;
    if(req.cookies.visitedBefore == null){
        res.cookie('visitedBefore', dateTime);
        User.find(function (err, user){
            res.render('index', {
                userList: user,
                user: req.session.user,
                visitCookie: "You visited this page for the first time!"
            });
        }); 
    }
    else{
        User.find(function (err, user){
            res.render('index', {
                userList: user,
                user: req.session.user,
                visitCookie: "You visited this page last on " + req.cookies.visitedBefore
            });
        }); 
        
        res.cookie('visitedBefore', dateTime);
    }
    
    User.findOne({'type': 'admin'}, function(err, user){
        if(user == null){
            var hashedPW = bcrypt.hashSync("pass");            
            var user = new User({
                username: "admin",
                password:hashedPW,
                email: "admin@email.com",
                age: "1",
                answers: ["BSWD", "Western U.S.", "2017"],
                type: "admin"
            });

            user.save(function (err, user){
                if(err) return console.error(err);
                console.log(req.body.username + ' was added!');
                console.log("TYPE:" + req.body.accType);
            });
        }
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
                    res.redirect('/');
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
        type: "student"
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
            user: req.session.user,
            theuser: user
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
        if(req.body.password != ""){
            var hashedPW = bcrypt.hashSync(req.body.password);
            user.password = hashedPW
        }
        user.save(function (err, user){
            if(err) return console.error(err);
            console.log(req.body.username + " info updated!");
        });
    });
    res.redirect('/');
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
    console.log("SESSION ID"+req.session.user.userID);
    console.log("PARAMS" + req.params.id);
    if(req.session.user.userID == req.params.id){
        console.log("CANT DELETE URSELF FOOL");
        res.redirect('/manage');
    }
    else{
        User.findByIdAndRemove(req.params.id, function (err, user){
        if (err) return console.error(err);
        res.redirect('/manage');
        });
    }
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