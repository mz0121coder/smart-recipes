import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipes from './pages/ViewRecipes';
import RecipeDetails from './components/RecipeDetails';
import NotFound from './components/NotFound';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/create-recipe' element={<CreateRecipe />} />
					<Route path='/view-recipes' element={<ViewRecipes />} />
					<Route path='/view-recipes/:id' element={<RecipeDetails />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
