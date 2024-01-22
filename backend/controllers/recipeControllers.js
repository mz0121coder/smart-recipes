const Recipe = require('../models/recipeModel');
const mongoose = require('mongoose');

// get all recipes
const getRecipes = async (req, res) => {
	const recipes = await Recipe.find({});
	res.status(200).json(recipes);
};

// get a single recipe
const getRecipe = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json({ error: 'No such recipe' });

	const recipe = await Recipe.findById(id);
	if (!recipe) return res.status(404).json({ error: 'No such recipe' });

	res.status(200).json(recipe);
};

// create a new recipe
const createRecipe = async (req, res) => {
	const { title, instructions } = req.body;
	// used to check if required fields are empty
	let emptyFields = [];
	if (!title) emptyFields.push(title);
	if (!instructions) emptyFields.push(instructions);

	if (emptyFields.length)
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });

	try {
		const recipe = await Recipe.create({ title, instructions });
		res.status(200).json(recipe);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a recipe
const deleteRecipe = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ error: 'No such recipe' });

	const recipe = await Recipe.findOneAndDelete({ _id: id });
	if (!recipe) return res.status(400).json({ error: 'No such recipe' });

	res.status(200).json(recipe);
};

// update a recipe
const updateRecipe = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ error: 'No such recipe' });

	const recipe = await Recipe.findOneAndUpdate({ _id: id }, { ...req.body });
	if (!recipe) return res.status(404).json({ error: 'No such recipe' });

	res.status(200).json(recipe);
};

module.exports = {
	getRecipes,
	getRecipe,
	createRecipe,
	deleteRecipe,
	updateRecipe,
};
