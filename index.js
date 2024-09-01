const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
const path = require("path")
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res) => {
    res.render("index")
})
app.listen(3000, () => {
    console.log("server up on 3000")
})