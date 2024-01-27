import { Request, Response } from 'express';
import Recipe from '../models/recipeModel';
import mongoose from 'mongoose';
import OpenAI from 'openai';

declare global {
	namespace Express {
		interface Request {
			user: { _id: any };
		}
	}
}

// create instance of openAI
const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

// get all recipes
const getRecipes = async (req: Request, res: Response) => {
	const user_id = req.user._id;
	// only show recipes created by current user
	const recipes = await Recipe.find({ user_id }).sort({ updatedAt: -1 });
	res.status(200).json(recipes);
};

// get a single recipe
const getRecipe = async (req: Request, res: Response) => {
	const { id } = req.params;
	//  handle invalid id or recipe with id not found
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json({ error: 'No such recipe' });
	const recipe = await Recipe.findById(id);
	if (!recipe) return res.status(404).json({ error: 'No such recipe' });

	res.status(200).json(recipe);
};

// create a new recipe
const createRecipe = async (req: Request, res: Response) => {
	const { title, instructions } = req.body;
	// used to check if required fields are empty
	let emptyFields: string[] = [];
	if (!title) emptyFields.push(title);
	if (!instructions) emptyFields.push(instructions);
	if (emptyFields.length)
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });

	try {
		// generate & send new recipe with instructions from request
		const chatCompletion = await openai.chat.completions.create({
			messages: [{ role: 'user', content: instructions }],
			model: 'gpt-3.5-turbo',
		});
		// assign recipe to current user
		const user_id = req.user._id;
		if (chatCompletion) {
			const recipe = await Recipe.create({
				title,
				instructions: chatCompletion.choices[0].message.content,
				user_id,
			});
			// res.status(200).json(chatCompletion.choices[0]);
			res.status(200).json(recipe);
		}
	} catch (error) {
		res.status(400).json({ error: 'An unknown error occurred' });
	}
};

// delete a recipe
const deleteRecipe = async (req: Request, res: Response) => {
	const { id } = req.params;
	//  handle invalid id or recipe with id not found
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ error: 'No such recipe' });
	const recipe = await Recipe.findOneAndDelete({ _id: id });
	if (!recipe) return res.status(400).json({ error: 'No such recipe' });
	// delete and send recipe
	res.status(200).json(recipe);
};

// update a recipe
const updateRecipe = async (req: Request, res: Response) => {
	const { id } = req.params;
	//  handle invalid id or recipe with id not found
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ error: 'No such recipe' });
	// update and send recipe
	const recipe = await Recipe.findOneAndUpdate({ _id: id }, { ...req.body });
	if (!recipe) return res.status(404).json({ error: 'No such recipe' });
	res.status(200).json(recipe);
};

export { getRecipes, getRecipe, createRecipe, deleteRecipe, updateRecipe };
