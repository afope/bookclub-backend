const { authJwt } = require('../middlewares')
const controller = require('../controllers/book.controller')

module.exports = function(app) {

    app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept'
		)
		next()
	})

    app.post('/api/books/add', [authJwt.verifyToken], controller.addBook)

    app.get('/api/books/', [authJwt.verifyToken], controller.getAllBooks)

    app.get('/api/book/:id', [authJwt.verifyToken], controller.getBook)

    app.post('/api/books/searchBook', [authJwt.verifyToken], controller.searchBook)

    app.get('/api/books/getBookImage', [authJwt.verifyToken], controller.getBookImage)

    // app.post('/api/books/voteBookOfTheMonth/:id', [authJwt.verifyToken], controller.voteBookofTheMonth)

    // app.get('/api/books/getAllSuggestedBooksForTheMonth', [authJwt.verifyToken], controller.getAllSuggestedBooksForTheMonth)

    // app.post('/api/books/suggestBookForTheMonth/:id', [authJwt.verifyToken], controller.suggestBookOfTheMonth)
}



