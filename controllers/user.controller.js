const db = require('../models')
const User = db.user

exports.updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		)
		res.send(200).json(updatedUser)
	} catch (error) {
		next(error)
	}
}

exports.deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(
			req.params.id,
		)

		res.send(200).json('User has been deleted successfully')
	} catch (error) {
		next(error)
	}
}

exports.getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)

		res.status(200).json(user)
	} catch (error) {
		next(error)
	}
}

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find()

		res.status(200).json(users)
	} catch (error) {
		next(error)
	}
}

exports.allAccess = (req, res) => {
	res.status(200).send('Public Content')
}

exports.adminBoard = (req, res) => {
	res.status(200).send('Admin Content')
}

exports.moderatorBoard = (req, res) => {
	res.status(200).send('Moderator Content')
}

exports.userBoard = (req, res) => {
	res.status(200).send('User Content')
}