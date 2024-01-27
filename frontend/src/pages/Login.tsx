import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/user/login`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password }),
				}
			);
			const data = await response.json();
			if (data) {
				console.log(data);
				dispatch(login(data));
				localStorage.setItem('user', JSON.stringify(data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-gray-100'>
			<form
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
				onSubmit={handleLogin}>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'>
						Email
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='email'
						placeholder='Enter your email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'>
						Password
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'>
						Log In
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;