import { useState } from 'react';

const CreateRecipe: React.FC = () => {
	const [title, setTitle] = useState('');
	const [instructions, setInstructions] = useState('');
	const [servings, setServings] = useState(0);

	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<h1 className='text-3xl font-bold mb-10'>Create Recipe</h1>
			<form className='flex flex-col gap-4 w-[95vw] max-w-[500px]'>
				<label className='text-gray-700 ml-2' htmlFor='title'>
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
				<label className='text-gray-700 ml-2' htmlFor='instructions'>
					Instructions:
				</label>
				<textarea
					className='bg-gray-100 border-2 border-gray-300 rounded-md p-2'
					id='instructions'
					placeholder='Enter recipe instructions'
					value={instructions}
					onChange={e => setInstructions(e.target.value)}
				/>
				<label className='text-gray-700 ml-2' htmlFor='servings'>
					Servings:
				</label>
				<input
					className='bg-gray-100 border-2 border-gray-300 rounded-md p-2'
					type='number'
					id='servings'
					min='1'
					max='20'
					step='1'
					placeholder='Enter number of servings'
					value={servings === 0 ? '' : servings}
					onChange={e => {
						setServings(Math.floor(Number(e.target.value.replace(/\D+/g, ''))));
						console.log(servings);
					}}
					required
				/>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>
					Create Recipe
				</button>
			</form>
		</div>
	);
};

export default CreateRecipe;
