const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    clientName: {type: String, required: true},
    reviewText: {type: String, required: true},
    rating: {type: Number,required: true, min: 1, max: 5},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Review', reviewSchema)