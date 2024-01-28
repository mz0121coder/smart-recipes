import PageLink from '../components/PageLink';
import listImg from '../assets/list.jpg';
import tableImg from '../assets/table-bg.jpg';
import ConfirmModal from '../components/ConfirmModal';
import Swal from 'sweetalert2';
import { FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';

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
						console.log('SIGN OUT WILL HAPPEN HERE');
						dispatch(logout());
						Swal.fire({
							title: 'Signed out',
							text: `You have succesfully signed out`,
							icon: 'success',
							showConfirmButton: false,
							timer: 1500,
						});
						localStorage.removeItem('user');
					}}
				/>
			)}
			<div className='mt-8 flex flex-col items-center justify-center gap-10'>
				<div className='flex gap-10'>
					<h1 className='[@media(max-width:350px)]:text-[24px] text-3xl font-bold'>
						Smart Recipes
					</h1>
					<button
						className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded grid place-items-center w-20'
						onClick={() => setShowLogoutModal(true)}>
						<FaSignOutAlt />
					</button>
				</div>
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
		</>
	);
}

export default HomePage;
