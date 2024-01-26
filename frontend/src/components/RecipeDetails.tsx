import { formatDistanceToNow } from 'date-fns';

const RecipeDetails: React.FC = () => {
	const recipe: SelectedRecipe = JSON.parse(
		localStorage.getItem('recipe') || '{}'
	);
	const instructions = recipe.instructions.split('\n');

	return (
		<div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
			<div className='max-w-3xl w-[95%] bg-white shadow-md rounded-md p-6'>
				<h1 className='text-3xl font-bold mb-4'>{recipe.title}</h1>
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
