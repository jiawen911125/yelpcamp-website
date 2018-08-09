var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Comment = require("./models/comment");
var Campground  = require("./models/campground");
var User = require("./models/user");
var seedDB = require("./seeds");
var methodOverride = require("method-override");
var flash = require("connect-flash");

//REQUIRING ROUTES
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

//seedDB();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(flash());

//===================================
//PASSPORT CONFIGURATION
//===================================
app.use(require("express-session")({
    secret:"Again rusty is the cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

/*Campground.create({
    name: "Spring Valley",
    image: "https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a93e785ae9dbb13f0b20f0c8ecfb294a&auto=format&fit=crop&w=707&q=80",
    description: "This is a huge granite hill, no bathroom. No water. Beautiful granite!"
}, function(err, campground) {
    if (err) {
        console.log(err);
    } else {
        console.log("CREATE A NEW CAMPGROUND!");
        //console.log(campground);
    }
})*/

/*var campgrounds = [
            {name:"Salmon Creek", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ca353cfcc4299e6c3d431ff862e1cf&auto=format&fit=crop&w=1006&q=80"},
            {name:"Granite Hill", image: "https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2f853d71f43de92c4d568531aa5608f&auto=format&fit=crop&w=1050&q=80"},
            {name:"Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=500&q=60"},
            {name:"Union Goat's Rest", image: "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b201f4cac49215d2be151bb4d5bc454f&auto=format&fit=crop&w=500&q=60"},
            {name:"Granite Hill", image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=500&q=60"},
            {name:"Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d2e4d45d037053be722233b79bd0510&auto=format&fit=crop&w=500&q=60"},
            {name:"Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=500&q=60"},
            {name:"Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1502113040754-9e3e85618a00?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f7e655cc68dc37a51ba6cd36e5327ca4&auto=format&fit=crop&w=500&q=60"},
            {name:"Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=45fc8a446ad11a120c543c426382119f&auto=format&fit=crop&w=1050&q=80"},
        ]*/

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YOU START A SERVER!");
})