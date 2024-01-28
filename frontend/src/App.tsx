import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipes from './pages/ViewRecipes';
import RecipeDetails from './pages/RecipeDetails';
import NotFound from './components/NotFound';
import UpdateRecipe from './pages/UpdateRecipe';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { useEffect } from 'react';
import { login } from './slices/userSlice';

function App() {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user') || 'null');
		if (localUser) dispatch(login(localUser));
	}, [dispatch]);

	console.log(!user);

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
						path='/signup'
						element={!user ? <Signup /> : <Navigate to='/' />}
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
