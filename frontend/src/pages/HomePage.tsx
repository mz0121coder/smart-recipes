import PageLink from '../components/PageLink';
// import cookingImg from '../assets/cooking.jpg';
import listImg from '../assets/list.jpg';
import tableImg from '../assets/table-bg.jpg';

function HomePage() {
	return (
		<>
			<div className='mt-8 grid place-items-center gap-10'>
				<h1 className='text-2xl'>Smart Recipes</h1>
				<h2 className='text-xl'>What would you like to do?</h2>
				<div className='grid [@media(max-width:600px)]:grid-cols-[1fr] grid-cols-[1fr_1fr] gap-8'>
					<PageLink
						description='Use AI to create a custom recipe!'
						page='/create-recipe'
						imgUrl={tableImg}
						action='Create a recipe'
						alt='Table of foods'
					/>
					<PageLink
						description='View all your saved recipes'
						page='/view-recipes'
						imgUrl={listImg}
						action='View your recipes'
						alt='Hand written notes'
					/>
				</div>
			</div>
		</>
	);
}

export default HomePage;
