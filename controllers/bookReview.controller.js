const mongoose = require('mongoose')
const db = require('../models')
const Book = db.book
const BookReview = db.bookReview  

exports.createReview = (req, res, next) => {
	let book_id = req.params.book_id 

	if(!mongoose.Types.ObjectId.isValid(book_id)) {
		return res.status(400).send({
			message: 'Invalid book id',
			data: {}
		})
	}

	Book.findOne({_id: book_id}).then(async (book) => {
		if(!book) {
			return res.status(400).send({
				message: 'No book found',
				data: {}
			})
		} else {
			const bookReview = new BookReview({
				review: req.body.review,
				stars: req.body.stars,
				book_id: book_id,
				user_id: req.userId
			})

			let savedBookReview = await bookReview.save()
			await Book.updateOne(
				{_id: book_id}, 
				{
					$push: { book_reviews: savedBookReview._id }
				}
			)

			return res.status(200).send({
				mesage: 'Review successfully added',
				data: savedBookReview
			})
		}
	}).catch((error) => {
		return res.status(400).send({
			message: error.message,
			data: error
		})
	}) 
}