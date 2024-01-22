import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipes from './pages/ViewRecipes';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/create-recipe' element={<CreateRecipe />} />
					<Route path='/view-recipes' element={<ViewRecipes />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
