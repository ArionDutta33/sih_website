if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
const path = require("path")
const { cloudinary } = require("./utils/cloudinary");
const multer = require('multer');
const { storage } = require('./utils/cloudinary');
const upload = multer({ storage });

//
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/upload", (req, res) => {
    res.render("upload")
})

app.post("/upload", upload.single("deepfake"), (req, res) => {
    console.log(req.file)
})



app.listen(3000, () => {
    console.log("server up on 3000")
})
//*implement upload