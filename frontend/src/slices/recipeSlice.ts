import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
	name: 'recipe',
	initialState: {
		recipe: {
			_id: '',
			createdAt: '',
			title: '',
			instructions: '',
			updatedAt: '',
			__v: -1,
		},
	},
	reducers: {
		selectRecipe: (state, action) => {
			state.recipe = action.payload;
		},
	},
});

export const { selectRecipe } = recipeSlice.actions;

export default recipeSlice;
