import Snake from 'snake-game-react';
import { Link } from 'react-router-dom';

const LoadingGame: React.FC<LoadingGameProps> = ({
	isLoading,
	loadingMsg,
	loadedMsg,
}) => (
	<div
		className='grid place-items-center h-screen'
		data-cy='loading-game-outer-div'>
		<div
			className='flex flex-col justify-center items-center gap-6'
			data-cy='loading-game-inner-div'>
			<h1 className='text-2xl font-bold' data-cy='loading-game-h1'>
				{isLoading ? loadingMsg : loadedMsg}
			</h1>
			{!isLoading && (
				<Link
					to='/view-recipes'
					className='flex justify-center items-center text-xl font-bold text-white bg-orange-600 hover:bg-orange-900 rounded-xl transition-colors duration-300 ease-in-out px-6 py-2 w-[200px] h-[60px]'>
					View Recipes
				</Link>
			)}
			<Snake
				color1='#248ec2'
				color2='#1d355e'
				backgroundColor='#ebebeb'
				className='w-[90vw] h-[auto] max-w-[500px]'
				data-cy='loading-game'
			/>
		</div>
	</div>
);

interface LoadingGameProps {
	isLoading: boolean;
	loadingMsg: string;
	loadedMsg: string;
}

export default LoadingGame;
