import PageLink from '../components/PageLink';
import listImg from '../assets/list.jpg';
import tableImg from '../assets/table-bg.jpg';

function HomePage() {
	return (
		<div className='mt-8 flex flex-col items-center justify-center gap-10'>
			<h1 className='text-3xl font-bold'>Smart Recipes</h1>
			<h2 className='text-xl'>What would you like to do?</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
				<PageLink
					description='Use AI to create a custom recipe!'
					page='/create-recipe'
					imgUrl={tableImg}
					action='Create a recipe'
					alt='Table of foods'
				/>
				<PageLink
					description='View your saved recipes'
					page='/view-recipes'
					imgUrl={listImg}
					action='View your recipes'
					alt='Hand written notes'
				/>
			</div>
		</div>
	);
}

export default HomePage;
