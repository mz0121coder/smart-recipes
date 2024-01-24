import { Link } from 'react-router-dom';

interface PageLinkProps {
	description: string;
	page: string;
	imgUrl: string;
	action: string;
	alt: string;
}

const PageLink: React.FC<PageLinkProps> = ({
	description,
	page,
	imgUrl,
	action,
	alt,
}) => {
	return (
		<div className='flex flex-col items-center justify-center gap-6 bg-orange-100 w-[95vw] max-w-[350px] h-[110vw] max-h-[400px] rounded-lg shadow-md'>
			<h3 className='text-lg font-medium'>{description}</h3>
			<img src={imgUrl} alt={alt} className='w-[90%] rounded-lg' />
			<Link
				to={page}
				className='inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 w-[200px] h-[50px]'>
				{action}
			</Link>
		</div>
	);
};

export default PageLink;
