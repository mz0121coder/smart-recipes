import express from 'express';

import {
	getRecipes,
	getRecipe,
	createRecipe,
	deleteRecipe,
	updateRecipe,
} from '../controllers/recipeControllers';

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

export default router;
