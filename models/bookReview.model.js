const mongoose = require('mongoose')

const reviewBook = mongoose.model(
    'reviewBook', 
    new mongoose.Schema({
        review: String,
        stars: Number,
        book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }, {
        timestamps: true
    })
)

module.exports = reviewBook