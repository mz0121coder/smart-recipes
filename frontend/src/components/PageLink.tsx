import { Link } from 'react-router-dom';

interface PageLinkProps {
	page: string;
	imgUrl: string;
	action: string;
}

const PageLink: React.FC<PageLinkProps> = ({ page, imgUrl, action }) => {
	return (
		<div className='flex flex-col items-center justify-center gap-4 bg-orange-100 w-[320px] h-[380px] rounded-[20px]'>
			<img src={imgUrl} alt='' className='w-[90%] rounded-[25px]' />
			<Link
				to={page}
				className='inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800'>
				{action}
			</Link>
		</div>
	);
};

export default PageLink;
