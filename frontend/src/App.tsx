import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/createRecipe';
import ViewRecipes from './pages/viewRecipes';

function App() {
	return (
		<>
			{/* <div className='text-center mt-4 flex flex-col gap-10'>
				<h1 className='text-2xl'>Smart Recipes</h1>
				<h2 className='text-xl'>What would you like to do?</h2>
			</div>
			<div>
				<PageLink />
				<PageLink />
			</div> */}
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
