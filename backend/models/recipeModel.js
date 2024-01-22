const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
	{
		title: { type: String, required: true },
		instructions: { type: String, required: true },
		// user_id: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
