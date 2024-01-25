import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { IoArrowBack } from 'react-icons/io5';

interface Recipe {
	_id: string;
	title: string;
	instructions: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

const ViewRecipes: React.FC = () => {
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState<Recipe[]>(() =>
		JSON.parse(localStorage.getItem('recipes') || '[]')
	);

	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchRecipes = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(`${import.meta.env.VITE_BASE_URL}`);
				const data = await res.json();
				if (data) {
					console.log(data);
					setRecipes(data);
					setFilteredRecipes(data);
					localStorage.setItem('recipes', JSON.stringify(recipes));
					setIsLoading(false);
				}
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		if (!recipes.length) fetchRecipes();
	}, [recipes]);

	return (
		<div className='w-[90vw] max-w-[700px] mx-auto mt-8 cursor-pointer'>
			<div className='flex gap-4 justify-center items-start mb-4'>
				<Link to='/'>
					<div className='bg-gray-200 h-10 w-20 grid place-items-center rounded [transition:background_800ms] hover:bg-gray-500 cursor-pointer flex-1'>
						<IoArrowBack />
					</div>
				</Link>
				<h1 className='text-3xl font-bold mb-4'>Recipes</h1>
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
			{isLoading && <h3>Loading recipes...</h3>}
			{filteredRecipes &&
				filteredRecipes.map((item: Recipe) => (
					<div
						key={item._id}
						className='bg-white shadow-md p-6 rounded-md mb-10 [transition:background_800ms] hover:bg-slate-200 flex justify-between items-start cursor-pointer'
						onClick={() => {
							localStorage.setItem('recipe', JSON.stringify(item));
							navigate(`/view-recipes/${item._id}`);
						}}>
						<div>
							<h2 className='text-2xl font-bold mb-2'>{item.title}</h2>
							<p className='text-gray-600 font-bold'>
								{`Created: ${formatDistanceToNow(new Date(item.createdAt), {
									addSuffix: true,
								})}`}
							</p>
						</div>
					</div>
				))}
		</div>
	);
};
export default ViewRecipes;
