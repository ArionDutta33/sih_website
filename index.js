if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
const asyncHandler = require("express-async-handler")
const path = require("path")
//
const Prediction = require("./models/predictionModel")
//
const { cloudinary } = require("./utils/cloudinary");
const multer = require('multer');
const { storage } = require('./utils/cloudinary');
const upload = multer({ storage });

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
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/info", (req, res) => {
    res.render("info")
})
app.get("/info/result", (req, res) => {
    res.render("result")
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




app.listen(3000, () => {
    console.log("server up on 3000")
})
//*implement upload