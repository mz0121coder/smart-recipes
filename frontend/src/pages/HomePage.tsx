import PageLink from '../components/PageLink';
import cookingImg from '../assets/cooking.jpg';
import listImg from '../assets/list.jpg';

function HomePage() {
	return (
		<>
			<div className='text-center mt-4 flex flex-col gap-10'>
				<h1 className='text-2xl'>Smart Recipes</h1>
				<h2 className='text-xl'>What would you like to do?</h2>
				<div className='flex justify-center gap-8'>
					<PageLink
						page='/create-recipe'
						imgUrl={cookingImg}
						action='Create a recipe'
					/>
					<PageLink
						page='/view-recipes'
						imgUrl={listImg}
						action='View your recipes'
					/>
				</div>
			</div>
		</>
	);
}

export default HomePage;
