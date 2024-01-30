import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import recipeSlice from './slices/recipeSlice';

export const store = configureStore({
	reducer: { user: userSlice.reducer, recipe: recipeSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
