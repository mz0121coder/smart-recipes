import Snake from 'snake-game-react';

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
