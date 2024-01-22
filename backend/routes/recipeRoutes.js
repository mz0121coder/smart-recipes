const express = require('express');

const {
	getRecipes,
	getRecipe,
	createRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../controllers/recipeControllers');

const router = express.Router();

// get all recipes
router.get('/', getRecipes);
// get a single recipe
router.get('/:id', getRecipe);
// create a recipe
router.post('/', createRecipe);
// delete a recipe
router.delete('/:id', deleteRecipe);
// update a recipe
router.patch('/:id', updateRecipe);

module.exports = router;
