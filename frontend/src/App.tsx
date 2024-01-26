import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipes from './pages/ViewRecipes';
import RecipeDetails from './pages/RecipeDetails';
import NotFound from './components/NotFound';
import UpdateRecipe from './pages/UpdateRecipe';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/create-recipe' element={<CreateRecipe />} />
					<Route path='/view-recipes' element={<ViewRecipes />} />
					<Route path='/view-recipes/:id' element={<RecipeDetails />} />
					<Route path='/view-recipes/:id/update' element={<UpdateRecipe />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
