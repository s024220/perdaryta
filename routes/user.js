var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');


var csrfProtection = csrf();
router.use(csrfProtection);

require('../config/passport');

router.get('/updateProfile', function(req, res, next) {
    res.render('user/updateProfile');
});

router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages,
        hasErrors: messages.length > 0})
});

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/user/signup2',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.post('/profile', function(req, res, next){
    User.findByIdAndUpdate({_id: req.user.id},
        {
            email: req.user.email,
            password: req.user.password,
            showname: req.body.showname,
            isTeacher: req.user.isTeacher
        }, function(err, docs){
            if(err){
                console.log('im here');
                res.json(err);
            }
            else
            {
                console.log(docs);
                res.redirect('/user/profile');
            }
        });
});

router.get('/getdata', function(req, res, next){
    User.findById({_id: req.user.id}, function(err, docs){
        if(err){
            console.log('im here');
            res.json(err);
        }
        else
        {
            console.log(docs);
            res.send(docs);
        }
    });
});

router.get('/profile', function(req, res, next){
    res.render('user/profile', { csrfToken: req.csrfToken(), username: req.user.showname, id: req.user.id });
});

router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages,
        hasErrors: messages.length > 0})
});

router.post('/signin', passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

router.get('/signup2/', function(req, res, next){
    res.render('user/signup2', {csrfToken: req.csrfToken()});
});

router.post('/signup2', function(req, res, next){
    User.findByIdAndUpdate({_id: req.user.id},
        {
            email: req.user.email,
            password: req.user.password,
            showname: req.user.showname,
            isTeacher: req.body.isTeacher
        }, function(err, docs){
            if(err){
                console.log('im here');
                res.json(err);
            }
            else
            {
//                console.log(json(docs));
                res.redirect('/user/signupFinal');
            }
        });
});

router.get('/signupFinal', function(req, res, next){
    res.render('user/signupFinal', { csrfToken: req.csrfToken(), username: req.user.showname, email: req.user.email });
});

router.post('/signupFinal', function(req, res, next){
    res.redirect('/user/signin');
});

module.exports = router;