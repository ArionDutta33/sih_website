const mongoose = require("mongoose")

const predictionSchema = new mongoose.Schema({
    result: { type: String, required: true, lowercase: true },
    video: { type: String, required: true }
})
module.exports = mongoose.model("Prediction", predictionSchema)