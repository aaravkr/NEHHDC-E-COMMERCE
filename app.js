var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
//var firebase = require('firebase');
const admin = require('firebase-admin');
const FirebaseStore = require('connect-session-firebase')(session);
//var env = require('require-env');
//
//
//
//
//var config = {
//    apiKey: "process.env.AIzaSyDn9YJPAvxGVboFwwmVQ9KDhSq1G_7VtK0",
//    authDomain: "process.env.database-e13ce.firebaseapp.com",
//    databaseURL: "process.env.https://database-e13ce.firebaseio.com",
//    projectId: "process.env.database-e13ce",
//    storageBucket: "process.env.database-e13ce.appspot.com",
//    messagingSenderId: "process.env.116387416221"
//};
//firebase.initializeApp(config);
//
//



var routes = require('./routes/index');
var app = express();
mongoose.connect('mongodb://localhost:27017/shop');



var serviceAccount = require("./nehhdc-b9932-firebase-adminsdk-i0z1g-663e5cfd54.json");

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nehhdc-b9932.firebaseio.com"
});

//var db = admin.firestore();
//var database = firebaseAdmin.database();
//
//function data() {
//    var FIREBASE_DATABASE = firebase.database();
//
//    FIREBASE_DATABASE.ref('/checkApp').push({
//        hello: 'hello world'
//    });
//};
//data();


// view engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//app.use(session({ 
//    secret:'mysecret',
//    resave:false, 
//    saveUninitialized:false,
//    store:new MongoStore({ mongooseConnection:mongoose.connection}),
//    cookie:{ maxAge: 180*60*1000}
//    
//}));

app.use(session({
    store: new FirebaseStore({
        database: firebaseAdmin.database()
    }),
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        originalMaxAge: 180 * 60 * 1000,
    }
}));


app.use(flash());



//admin.auth().verifyIdToken(idToken)
//  .then(function(decodedToken) {
//    var uid = decodedToken.uid;
//    console.log('user is loggd in'+ uid);
//  }).catch(function(error) {
//    console.log('no user');
//    // Handle error
//  });




app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}




// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
