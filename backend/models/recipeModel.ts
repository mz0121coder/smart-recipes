import mongoose from 'mongoose';

const { Schema } = mongoose;

interface Recipe {
	title: string;
	instructions: string;
}

const recipeSchema = new Schema<Recipe>(
	{
		title: { type: String, required: true },
		instructions: { type: String, required: true },
		// user_id: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model('Recipe', recipeSchema);
