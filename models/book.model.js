const mongoose = require('mongoose')

const Book = mongoose.model(
	'Book',
	new mongoose.Schema({
		title: {
			type: String, 
			require: true,
			unique: true
		}, 
		author: {
			type: String, 
			require: true, 
		},
		isbn: {
			type: String, 
			require: true, 
		},
		yearPublished: {
			type: Number,
			require: true
		}, 
		createdBy: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'User'
		}, 
		bookReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'bookReview'}]
	}, {
		timestamps: true
	})
)

module.exports = Book