const mongoose = require("mongoose")

const predictionSchema = new mongoose.Schema({
    result: { type: String, required: true, lowercase: true },
    image: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
module.exports = mongoose.model("Prediction", predictionSchema)