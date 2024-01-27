import { CirclesWithBar } from 'react-loader-spinner';

const Loader: React.FC<LoaderProps> = ({ message }) => (
	<div className='grid place-items-center h-screen'>
		<div className='flex flex-col justify-center items-center gap-4'>
			<h3 className='font-bold text-lg'>{message}</h3>
			<CirclesWithBar
				height='200'
				width='200'
				color='#4fa94d'
				outerCircleColor='#4fa94d'
				innerCircleColor='#4fa94d'
				barColor='#4fa94d'
				ariaLabel='circles-with-bar-loading'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
			/>
		</div>
	</div>
);

interface LoaderProps {
	message: string;
}

export default Loader;
