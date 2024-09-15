if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
const asyncHandler = require("express-async-handler")
const session = require('express-session');

const path = require("path")
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
//
const Prediction = require("./models/predictionModel")
//
const { cloudinary } = require("./utils/cloudinary");
const multer = require('multer');
const { storage } = require('./utils/cloudinary');
const upload = multer({ storage });


//*utils
const { isLoggedIn } = require("./middlewares")
//
//*connect
mongoose.connect("mongodb://127.0.0.1:27017/plantDiseaseDB").then(() => {
    console.log("mongodb up")
}).catch((error) => {
    console.log(error, "error")
})
//*
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

//session config
const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
})


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/info", (req, res) => {

    res.render("info")
})
app.get("/info/upload", isLoggedIn, (req, res) => {
    res.render("upload")
})
app.post("/upload", upload.single("disease"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "File upload failed!" });
        }

        const { path } = req.file;
        const prediction = new Prediction({
            result: "This is a placeholder for result hahahahaha lol",
            image: path
        });

        await prediction.save();

        return res.json(prediction);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
app.get("/user/:id/predictions", isLoggedIn, async (req, res) => {
    try {
        const predictions = await Prediction.find({ user: req.params.id });
        // res.render("predictions", { predictions });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

//* user
app.get("/register", (req, res) => {
    res.render("register")
})
app.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        console.log("check")
        req.login(registeredUser, err => {
            if (err) return next(err);

            res.redirect('/');
        })
    } catch (e) {

        res.redirect('register');
    }
})
app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

// Logout Route
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Handle any errors during logout
        }
        // req.flash('success', 'Logged out successfully');
        res.redirect('/login'); // Redirect the user to the homepage or login page after logout
    });
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {
        statusCode = 500
    } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {
        err
    })
})

app.listen(3000, () => {
    console.log("server up on 3000")
})
//*implement upload