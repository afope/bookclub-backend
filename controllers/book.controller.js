const db = require('../models')
const Book = db.book

exports.addBook = async (req, res) => {
	console.log('req', req.userId)
  try {
		const book = new Book({
			title: req.body.title,
			author: req.body.author,
			isbn: req.body.isbn,
			yearPublished: req.body.yearPublished,
			createdBy: req.userId
		})

		const savedBook = await book.save()
		res.status(200).send({ message: 'Book added successfully'})
		return savedBook
  } catch (error) {
		console.log('error', error)
		res.status(500).send({ message: error})
	}
}

exports.getBook = async (req, res, next) => {
	try {
		const book = await Book.findById(req.params.id)
		
		res.status(200).json(book)
	} catch (error) {
		next(error)
	}
}

exports.searchBook = async (req, res, next) => {
	const books = await Book.find()
	const filters = req.body.query;

	console.log('filters', filters)

	const filteredBooks = books.filter(book => {
		let isValid = true;
		for (key in filters) {
			console.log('key', book.title[key], filters[key])
			isValid = isValid && book.title[key].toLowerCase() == filters[key].toLowerCase()
		}
		return isValid;
	})
	res.status(200).json(filteredBooks)
}

exports.getAllBooks = async (req, res, next) => {
	try {
		const books = await Book.find()
	  
		res.status(200).json(books)
	} catch (error) {
		next(error)
	}
}

exports.getBookImage = async (req, res, next) => {
	try {
		
	} catch (error) {
		
	}
}