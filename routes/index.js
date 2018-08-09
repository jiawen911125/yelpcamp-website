var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    res.render("landing");
})
//====================
//AUTH ROUTES
//====================
router.get("/register", function(req, res) {
    res.render("register");
})
//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp! " + user.username);
            res.redirect("/campgrounds");
        });
    });
});
//SHOW LOG IN FORM
router.get("/login", function(req, res) {
    res.render("login");
})
//HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        
    })
//LOG OUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;