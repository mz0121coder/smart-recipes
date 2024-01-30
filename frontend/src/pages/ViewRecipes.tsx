import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { IoArrowBack } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectRecipe } from '../slices/recipeSlice';
import Loader from '../components/Loader';

const ViewRecipes: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [recipes, setRecipes] = useState<Recipe[]>(() => []);
	const user = useSelector((state: RootState) => state.user.user);
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await fetch(
					`https://smart-recipes.onrender.com/api/recipes`,
					{
						headers: { Authorization: `Bearer ${user.token}` },
					}
				);
				const data = await response.json();
				if (data) {
					setRecipes(data);
					setFilteredRecipes(data);
					setIsLoading(false);
				}
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		if (isLoading) fetchRecipes();
	}, [isLoading, user.token]);

	return isLoading ? (
		<Loader message={'Loading recipes...'} />
	) : (
		<div className='w-[90vw] max-w-[700px] mx-auto mt-8'>
			<div className='flex justify-between items-start mb-4'>
				<Link to='/'>
					<div className='bg-gray-200 h-10 w-20 grid place-items-center rounded [transition:background_800ms] hover:bg-gray-500 cursor-pointer flex-1'>
						<IoArrowBack />
					</div>
				</Link>
				<h1 className='text-3xl font-bold mb-4'>Recipes</h1>
				<div></div>
			</div>
			<div className='flex items-center justify-center gap-4 mb-8'>
				<label htmlFor='recipe-input' className='font-bold'>
					Search:
				</label>
				<input
					id='recipe-input'
					type='text'
					placeholder='Enter recipe name'
					className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
					onChange={e => {
						setFilteredRecipes(
							recipes.filter(recipe =>
								recipe.title
									.toLowerCase()
									.startsWith(e.target.value.toLowerCase())
							)
						);
					}}
				/>
			</div>
			{filteredRecipes &&
				filteredRecipes.map((recipe: Recipe) => (
					<div
						key={recipe._id}
						className='bg-white shadow-md p-6 rounded-md mb-10 [transition:background_800ms] hover:bg-slate-200 flex justify-between items-start cursor-pointer'
						onClick={() => {
							dispatch(selectRecipe(recipe));
							navigate(`/view-recipes/${recipe._id}`);
						}}>
						<div>
							<h2 className='text-2xl font-bold mb-2'>{recipe.title}</h2>
							<p className='text-gray-600 font-bold'>
								{`Updated: ${formatDistanceToNow(new Date(recipe.updatedAt), {
									addSuffix: true,
								})}`}
							</p>
						</div>
					</div>
				))}
		</div>
	);
};

interface Recipe {
	_id: string;
	title: string;
	instructions: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export default ViewRecipes;
