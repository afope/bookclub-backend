const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
	try {
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password)
		})

		const savedUser = await user.save()
		res.status(200).send({ message: 'User regsitered successfully.' })
		return savedUser
	} catch (error) {
		console.log('error', error)
		res.status(500).send({ message: error })
	}
}

exports.signin = async (req, res) => {
	User.findOne({
		email: req.body.email
	})
		.populate('roles', '-__v')
		.exec((err, user) => {
			if (err) {
				res.status(500).send({ message: err })
			}

			if (!user) {
				return res.status(404).send({ message: 'User not found.' })
			}

			const isPasswordValid = bcrypt.compareSync(
				req.body.password,
				user.password
			)

			if (!isPasswordValid) {
				return res.status(401).send({ message: 'Invalid Password' })
			}

			const token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400
			})

			const authorities = []

			for (let i = 0; i > user.roles.length; i++) {
				authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
			}

			req.session.token = token

			res.status(200).send({
				id: req.userId,
				username: user.usernamee,
				email: user.email
			})
		})
}

exports.signout = async (req, res) => {
	try {
		req.session = null
		return res.status(200).send({ message: "You've been signed out." })
	} catch (err) {
		this.next(err)
	}
}