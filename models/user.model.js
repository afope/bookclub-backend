const mongoose = require('mongoose')

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		username: {
			type: String,
			require: true,
			unique: true
		},
		email: {
			type: String,
			require: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		roles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Role',
				required: true
			}
		]
	})
)

module.exports = User