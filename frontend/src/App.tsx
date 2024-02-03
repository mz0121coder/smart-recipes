import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { login } from './slices/userSlice';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipes from './pages/ViewRecipes';
import RecipeDetails from './pages/RecipeDetails';
import UpdateRecipe from './pages/UpdateRecipe';
import NotFound from './components/NotFound';

function App() {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user') || 'null');
		if (localUser) dispatch(login(localUser));
	}, [dispatch]);

	/*
	Render's free tier spins down after 15 minutes of inactivity, so a simple get request to the test endpoint is made when the app first renders, and then every 10 minutes while the session is active
	*/
	useEffect(() => {
		const startTestServer = async () => {
			const response = await fetch(
				`https://smart-recipes.onrender.com/api/test`
			);
			const data = await response.json();
			if (data && !('error' in data)) console.log('Test endpoint is active');
		};
		startTestServer();
		const testInterval = setInterval(() => startTestServer(), 10 * 60 * 1000);
		return () => clearInterval(testInterval);
	}, []);

	const isLoggedIn = user.token.length;

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={isLoggedIn ? <HomePage /> : <Navigate to='/login' />}
					/>
					<Route
						path='/login'
						element={!isLoggedIn ? <Login /> : <Navigate to='/' />}
					/>
					<Route
						path='/create-recipe'
						element={isLoggedIn ? <CreateRecipe /> : <Navigate to='/login' />}
					/>
					<Route
						path='/view-recipes'
						element={isLoggedIn ? <ViewRecipes /> : <Navigate to='/login' />}
					/>
					<Route
						path='/view-recipes/:id'
						element={isLoggedIn ? <RecipeDetails /> : <Navigate to='/login' />}
					/>
					<Route
						path='/view-recipes/:id/update'
						element={isLoggedIn ? <UpdateRecipe /> : <Navigate to='/login' />}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
