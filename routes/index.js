var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var jsdom = require('jsdom');

//const { JSDOM } = jsdom;
//const { window } = new JSDOM();
//const { document } = (new JSDOM('')).window;
//global.document = document;
//
//var $ = jQuery = require('jquery')(window);




var Product = require('../models/product');



/* GET home page. */
router.get('/', function (req, res, next) {

    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }

        res.render('shop/index', {

            title: 'Shopping Cart',
            products: productChunks
        });

    });
});



router.get('/user/signin', function (req, res) {
    res.render('user/signin');
});

router.get('/user/signup', function (req, res) {
    
    res.render('user/signup');
});

router.get('/user/profile',function(req,res,next){
    res.render('user/profile');
});

router.get('/add-to-cart/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: {}
    });

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, productId);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
});

router.get('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {
       total:cart.totalPrice
    });
});

//
//
//router.post('/user/signup', passport.authenticate('local.signup', {
//    successRedirect:'/user/profile',
//    failureRedirect:'/user/signin',
//    failureFlash:true
//}));
//router.get('/user/profile',function(req,res,next){
//    res.render('user/profile');
//});

module.exports = router;
//function isLoggedIn(req,res,next){
//   var user = firebase.auth().currentUser;
//    if(user !== null){
//        req.user = user;
//        next();
//        
//    }else{
//       res.redirect('/');
//    }
//};

//function parseData(html){
//    const {JSDOM} = jsdom;
//	const dom = new JSDOM(html);
//   	const $ = (require('jquery'))(dom.window);
//    
//    var items = $(".list_item").text("hey lman");
//    
//}
                                     
                                     
                                     
                                     
                                     
                                     
                                     
                                     
                                     
                                     
                                     
                                     
                                     
                                     

