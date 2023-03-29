const { authJwt } = require('../middlewares')
const controller = require('../controllers/bookReview.controller')

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept'
		)
		next()
	})

	app.post('/:book_id/review/create', [authJwt.verifyToken], controller.createReview)

}