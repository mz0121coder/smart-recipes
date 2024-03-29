import { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import PageLink from '../components/PageLink';
import listImg from '../assets/list.jpg';
import tableImg from '../assets/table.jpg';
import ConfirmModal from '../components/ConfirmModal';
import Animation from '../components/Animation/Animation';
import Swal from 'sweetalert2';

function HomePage() {
	const dispatch = useDispatch();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	return (
		<>
			{showLogoutModal && (
				<ConfirmModal
					message='Do you want to sign out?'
					handleCancel={() => setShowLogoutModal(false)}
					handleConfirm={() => {
						dispatch(logout());
						Swal.fire({
							title: 'Signed out',
							text: `You have successfully signed out`,
							icon: 'success',
							showConfirmButton: false,
							timer: 1500,
						});
						localStorage.removeItem('user');
					}}
				/>
			)}
			<Animation />
			<div className='my-6 flex flex-col justify-center items-center gap-10'>
				<div className='flex gap-10 items-center'>
					<h1
						className='[@media(max-width:350px)]:text-[27px] text-3xl font-bold'
						data-cy='homepage-h1'>
						Smart Recipes
					</h1>
					<button
						className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded grid place-items-center w-20 h-10'
						onClick={() => setShowLogoutModal(true)}
						data-cy='signout-btn'>
						<FaSignOutAlt />
					</button>
				</div>
				<h2 className='text-xl' data-cy='homepage-h2'>
					What would you like to do?
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4'>
					<PageLink
						description='Create a new recipe with AI'
						page='/create-recipe'
						imgUrl={tableImg}
						action='Create a recipe'
						alt='Table of foods'
						data-cy='create-recipe-link'
					/>
					<PageLink
						description='View or manage your recipes'
						page='/view-recipes'
						imgUrl={listImg}
						action='View your recipes'
						alt='Handwritten notes'
						data-cy='view-recipes-link'
					/>
				</div>
			</div>
		</>
	);
}

export default HomePage;
