import React from 'react';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	message,
	handleCancel,
	handleConfirm,
}) => {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-4 rounded-md w-[95vw] max-w-[350px] text-center'>
				<h2 className='text-lg font-bold mb-4' data-cy='confirm-modal-h2'>
					{message}
				</h2>
				<div className='flex justify-center gap-4'>
					<button
						type='button'
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-[45%]'
						data-cy='confirm-modal-no'
						onClick={handleCancel}>
						No
					</button>
					<button
						type='button'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-[45%]'
						data-cy='confirm-modal-yes'
						onClick={handleConfirm}>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

interface ConfirmModalProps {
	message: string;
	handleCancel: () => void;
	handleConfirm: () => void;
}

export default ConfirmModal;
