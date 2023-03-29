const { roles } = require('../models')
const db = require('../models')
const User = require('../models/user.model')
const ROLES = db.roles

const checkDuplicateUsernameOrEmail = (req, res, next) => {
	// Username
	User.findOne({
		username: req.body.username
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err })
		}

		if (user) {
			res.status(400).send({ message: 'Failed! Username already exists' })
		}
	})

	// Email
	User.findOne({
		email: req.body.email
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err })
		}

		if (user) {
			res.status(400).send({ message: 'Failed! Email already exists' })
			return
		}

		next(err)
	})
}

const checkRolesExists = (req, res, next) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.status(400).send({
					message: `Failed Role! ${req.body.roles[i]} does not exist!`
				})

				return
			}
		}
	}

	next()
}

const verifySignUp = {
	checkDuplicateUsernameOrEmail,
	checkRolesExists
}

module.exports = verifySignUp