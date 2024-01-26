import Snake from 'snake-game-react';
import { Link } from 'react-router-dom';

const LoadingGame: React.FC<LoadingGameProps> = ({
	isLoading,
	loadingMsg,
	loadedMsg,
}) => (
	<div className='grid place-items-center h-screen'>
		<div className='flex flex-col justify-center items-center gap-4'>
			<h1 className='text-lg font-bold'>
				{isLoading ? loadingMsg : loadedMsg}
			</h1>
			{!isLoading && (
				<Link
					to='/view-recipes'
					className='flex justify-center items-center text-lg text-blue-900 hover:underline font-bold mb-4 bg-orange-500 hover:bg-red-900 rounded-xl transition-colors duration-300 ease-in-out px-6 py-2'>
					View your recipes
				</Link>
			)}
			<Snake
				color1='#248ec2'
				color2='#1d355e'
				backgroundColor='#ebebeb'
				className='w-[90vw] h-[auto] max-w-[500px]'
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
