import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingGame from '../components/LoadingGame';
import ConfirmModal from '../components/ConfirmModal';

const CreateRecipe: React.FC = () => {
	const user = JSON.parse(localStorage.getItem('user') || 'null');
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [instructions, setInstructions] = useState('');
	const [servings, setServings] = useState(0);
	const [requirements, setRequirements] = useState<string[]>([]);
	const [showReqModal, setShowReqModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const specialDiets: string[] = [
		'Vegetarian',
		'Vegan',
		'Gluten-free',
		'Dairy-free',
		'Egg-free',
		'Soy-free',
		'Nut-free',
		'Seed-free',
		'Low-carb',
		'Low-fat',
		'Low-sugar',
		'Low-sodium',
		'High-fiber',
		'High-protein',
		'Ketogenic',
		'Paleo',
		'Whole30',
		'Mediterranean',
	];

	const handleCancel = () => {
		if (title.length && servings > 0) {
			setShowCancelModal(true);
		} else {
			navigate('/');
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const guidelines = `Please generate a great, customised recipe based on these guidelines:
		Title: ${title}
		Servings: ${servings}
		Special Diet Requirements (optional): ${
			requirements.length > 0 ? requirements.join(', ') : 'N/A'
		}
		Other instructions (optional): ${instructions.length > 0 ? instructions : ''}
		
		Your response should only consist of the recipe title, ingredients (unordered list) and instructions (numbered list of steps to follow)`;
		try {
			setIsLoading(true);
			setIsPlaying(true);
			const response = await fetch(
				`https://smart-recipes.onrender.com/api/recipes`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ title, instructions: guidelines }),
				}
			);
			const data = await response.json();
			if (data) {
				console.log(data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return isPlaying ? (
		<LoadingGame
			isLoading={isLoading}
			loadingMsg='Creating new recipe...'
			loadedMsg='New recipe created!'
		/>
	) : (
		<>
			<div className='flex flex-col justify-center items-center my-6'>
				<h1 className='text-3xl font-bold my-4'>Create Recipe</h1>
				<form
					className='flex flex-col gap-4 w-[90vw] max-w-[500px]'
					onSubmit={handleSubmit}>
					<label
						className='text-gray-700 ml-2 font-bold text-lg'
						htmlFor='title'>
						Title:
					</label>
					<input
						className='bg-gray-100 border-2 border-gray-300 rounded-md p-2'
						type='text'
						id='title'
						placeholder='Enter recipe title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
					<label
						className='text-gray-700 ml-2 font-bold text-lg'
						htmlFor='instructions'>
						Instructions (optional):
					</label>
					<textarea
						className='bg-gray-100 border-2 border-gray-300 rounded-md p-2'
						id='instructions'
						placeholder='Enter recipe instructions'
						value={instructions}
						onChange={e => setInstructions(e.target.value)}
					/>
					<label
						className='text-gray-700 ml-2 font-bold text-lg'
						htmlFor='servings'>
						Servings:
					</label>
					<input
						className='bg-gray-100 border-2 border-gray-300 rounded-md p-2'
						type='number'
						inputMode='numeric'
						id='servings'
						min='1'
						max='20'
						step='1'
						placeholder='Enter number of servings'
						value={servings === 0 ? '' : servings}
						onChange={e => {
							setServings(
								Math.floor(Number(e.target.value.replace(/\D+/g, '')))
							);
						}}
						required
					/>
					<label className='text-gray-700 ml-2 font-bold my-2'>
						Special Diet Requirements (optional):
					</label>
					{requirements.length > 0 && (
						<>
							<div
								className='grid grid-cols-[1fr_1fr] w-[90vw] max-w-[500px] overflow-scroll gap-2'
								style={{ height: `${2 * requirements.length} px` }}>
								{requirements.map((requirement, index) => (
									<div key={index} className='flex items-center gap-1'>
										<input
											type='text'
											className='text-sm font-bold bg-gray-100 border-2 border-gray-300 rounded-md p-1 w-[125px]'
											placeholder='Enter requirement'
											value={requirement}
											onChange={e => {
												const updatedRequirements = [...requirements];
												updatedRequirements[index] = e.target.value;
												setRequirements(updatedRequirements);
											}}
										/>
										<button
											type='button'
											className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md'
											onClick={() =>
												setRequirements([
													...requirements.slice(0, index),
													...requirements.slice(index + 1),
												])
											}>
											X
										</button>
									</div>
								))}
							</div>
						</>
					)}
					<button
						type='button'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-2 h-[45px]'
						onClick={() => setShowReqModal(true)}>
						Add Requirement
					</button>
					<div className='flex gap-4 mb-8'>
						<button
							type='button'
							className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex-1 h-[45px]'
							onClick={handleCancel}>
							Cancel
						</button>
						<button
							type='submit'
							className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex-1 h-[45px]'>
							Create
						</button>
					</div>
				</form>
				{showReqModal && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-white p-4 rounded-md w-[95vw] max-w-[350px] text-center'>
							<h2 className='text-lg font-bold mb-2'>
								Special Diet Requirements
							</h2>
							<div className='grid grid-cols-[1fr_1fr] gap-3'>
								{specialDiets.map((diet, index) => (
									<label key={index} className='flex items-center gap-2'>
										<input
											type='checkbox'
											className='form-checkbox h-4 w-4 text-blue-500'
											value={diet}
											checked={requirements.includes(diet)}
											onChange={e => {
												if (e.target.checked) {
													setRequirements([...requirements, e.target.value]);
												} else {
													setRequirements(
														requirements.filter(r => r !== e.target.value)
													);
												}
											}}
										/>
										{diet}
									</label>
								))}
							</div>
							<button
								type='button'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-[80%]'
								onClick={() => setShowReqModal(false)}>
								Confirm
							</button>
						</div>
					</div>
				)}
				{showCancelModal && (
					<ConfirmModal
						message='Are you sure you want to cancel?'
						handleCancel={() => setShowCancelModal(false)}
						handleConfirm={() => {
							setShowCancelModal(false);
							navigate('/');
						}}
					/>
				)}
			</div>
		</>
	);
};

export default CreateRecipe;
