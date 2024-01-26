import React, { useEffect } from 'react';

interface SnackbarProps {
	message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			// Hide the snackbar after 1.5 seconds
			const snackbar = document.getElementById('snackbar');
			if (snackbar) {
				snackbar.style.display = 'none';
			}
		}, 1500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<div
			id='snackbar'
			className='fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md'>
			<p>{message}</p>
		</div>
	);
};

export default Snackbar;
