import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

const RecipeDetails: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [selectedOption, setSelectedOption] = useState('');
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	const recipe: SelectedRecipe = JSON.parse(
		localStorage.getItem('recipe') || '{}'
	);
	const instructions = recipe.instructions.split('\n');

	useEffect(() => {
		if (selectedOption === 'delete') setShowConfirmDelete(true);
	}, [selectedOption]);

	// find and delete recipe with matching id from DB
	const handleDelete = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${id}`, {
				method: 'DELETE',
			});
			const data = await response.json();
			if (data) {
				console.log(data);
				navigate('/view-recipes');
			}
		} catch (error) {
			console.log(error);
			setSelectedOption('');
		}
	};

	return (
		<>
			{showConfirmDelete && (
				<ConfirmModal
					message='Are you sure you want to delete this recipe?'
					handleCancel={() => {
						setShowConfirmDelete(false);
						setSelectedOption('');
					}}
					handleConfirm={() => handleDelete()}
				/>
			)}
			<div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
				<div className='max-w-3xl w-[95%] bg-white shadow-md rounded-md p-6'>
					<div className='flex justify-between items-start mb-4'>
						<Link to='/view-recipes'>
							<div className='bg-gray-200 h-10 w-20 grid place-items-center rounded [transition:background_800ms] hover:bg-gray-500 cursor-pointer'>
								<IoArrowBack />
							</div>{' '}
						</Link>
						<select
							className='px-2 py-1 bg-gray-200 rounded-md h-10 w-30'
							value={selectedOption}
							onChange={e => setSelectedOption(e.target.value)}>
							<option value=''>Options</option>
							<option value='update'>Update</option>
							<option value='delete'>Delete</option>
						</select>
					</div>
					<h1 className='text-3xl font-bold mb-4 [@media(width<600px)]:text-2xl'>
						{recipe.title}
					</h1>
					<p className='text-gray-500 mb-4'>
						Last Updated:{' '}
						<span className='italic'>
							{formatDistanceToNow(new Date(recipe.updatedAt), {
								addSuffix: true,
							})}
						</span>
					</p>
					<h2 className='text-xl font-bold mb-2'>Instructions:</h2>
					{instructions.map((line, idx) => (
						<p
							key={idx}
							className={
								['ingredients', 'instructions'].includes(
									line.toLowerCase().replace(/[^a-z]+/gi, '')
								)
									? 'font-bold mb-2 underline'
									: 'mb-2'
							}>
							{line}
						</p>
					))}
				</div>
			</div>
		</>
	);
};

interface SelectedRecipe {
	_id: string;
	title: string;
	instructions: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export default RecipeDetails;