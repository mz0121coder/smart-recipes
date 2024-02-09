import Snake from 'snake-game-react';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<div
		className='grid place-items-center h-screen'
		data-cy='not-found-page-outer-div'>
		<div
			className='flex flex-col justify-center items-center gap-4'
			data-cy='not-found-page-inner-div'>
			<h1 className='text-lg font-bold' data-cy='not-found-page-h1'>
				This is an invalid URL.
			</h1>
			<Link
				to='/'
				className='flex justify-center items-center text-lg-blue-900 hover:underline font-bold mb-4 bg-orange-500 w-[150px] h-[40px] rounded-xl hover:bg-red-900 [transition:background_900ms]'
				data-cy='go-back-link'>
				Go Back
			</Link>
			<Snake
				color1='#248ec2'
				color2='#1d355e'
				backgroundColor='#ebebeb'
				className='w-[90vw] h-[auto] max-w-[500px]'
				data-cy='not-found-page-loading-game'
			/>
		</div>
	</div>
);
export default NotFound;
