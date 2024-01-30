import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const UpdateRecipe: React.FC = () => {
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user.user);
	const recipe = useSelector((state: RootState) => state.recipe.recipe);
	const [title, setTitle] = useState(recipe.title);
	const [instructions, setInstructions] = useState(recipe.instructions);
	const [showConfirmCancel, setShowConfirmCancel] = useState(false);
	const { id } = useParams();

	const handleUpdate = async () => {
		try {
			const response = await fetch(
				`https://smart-recipes.onrender.com/api/recipes/${id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ title, instructions }),
				}
			);
			const data = await response.json();
			if (data) {
				console.log(data);
				navigate(`/view-recipes`);
				Swal.fire({
					title: 'Recipe updated',
					text: `${title} has been updated`,
					icon: 'success',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{showConfirmCancel && (
				<ConfirmModal
					message='Are you sure you want to cancel?'
					handleCancel={() => setShowConfirmCancel(false)}
					handleConfirm={() => navigate(-1)}
				/>
			)}
			<div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
				<div className='max-w-3xl w-[95%] bg-white shadow-md rounded-md p-6'>
					<textarea
						className='text-2xl font-bold bg-gray-100 border-2 rounded-md w-full h-[50px] border-gray-300 mb-2 pl-2 pt-1'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<textarea
						className='bg-gray-100 border-2 border-gray-300 rounded-md p-2 mb-4 w-full h-[100vw] max-h-[400px]'
						value={instructions}
						onChange={e => setInstructions(e.target.value)}
					/>
					<div className='flex justify-center gap-10'>
						<button
							className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-[40%]'
							onClick={() => setShowConfirmCancel(true)}>
							Cancel
						</button>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-[40%]'
							onClick={handleUpdate}>
							Update
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateRecipe;
