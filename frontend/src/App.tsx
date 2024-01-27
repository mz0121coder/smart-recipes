import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipes from './pages/ViewRecipes';
import RecipeDetails from './pages/RecipeDetails';
import NotFound from './components/NotFound';
import UpdateRecipe from './pages/UpdateRecipe';
import { RootState } from './store';
// import { useEffect } from 'react';

function App() {
	const user = useSelector((state: RootState) => state.user);
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	const localUser = JSON.parse(localStorage.getItem('user') || 'null');
	// 	if (localUser) dispatch(localUser);
	// 	console.log({ localUser });
	// }, [dispatch]);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={user ? <HomePage /> : <Navigate to='/login' />}
					/>
					<Route
						path='/login'
						element={!user ? <Login /> : <Navigate to='/' />}
					/>
					<Route
						path='/create-recipe'
						element={user ? <CreateRecipe /> : <Navigate to='/login' />}
					/>
					<Route
						path='/view-recipes'
						element={user ? <ViewRecipes /> : <Navigate to='/login' />}
					/>
					<Route
						path='/view-recipes/:id'
						element={user ? <RecipeDetails /> : <Navigate to='/login' />}
					/>
					<Route
						path='/view-recipes/:id/update'
						element={user ? <UpdateRecipe /> : <Navigate to='/login' />}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
