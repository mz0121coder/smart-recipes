import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../slices/userSlice';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const dispatch = useDispatch();

	const handleLogin = async (
		e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
	) => {
		e.preventDefault();
		const response = await fetch(
			`https://smart-recipes.onrender.com/api/user/login`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
		);
		const data = await response.json();
		// if user has valid credentials, update global state and store token
		if (data && !('error' in data)) {
			dispatch(login(data));
			localStorage.setItem('user', JSON.stringify(data));
			Swal.fire({
				title: 'Logged in',
				text: `You are now logged in`,
				icon: 'success',
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			setErrorMsg(
				!email.length || !password.length
					? 'All fields must be filled'
					: 'Invalid credentials'
			);
			dispatch(logout());
			localStorage.removeItem('user');
		}
	};

	const handleSignup = async (
		e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
	) => {
		e.preventDefault();
		const response = await fetch(
			`https://smart-recipes.onrender.com/api/user/signup`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
		);
		const data = await response.json();
		// if user has valid credentials, update global state and store token
		if (data && !('error' in data)) {
			console.log(data);
			dispatch(login(data));
			localStorage.setItem('user', JSON.stringify(data));
			Swal.fire({
				title: 'Signed up',
				text: `You have succesfully signed up`,
				icon: 'success',
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			setErrorMsg(
				!email.length || !password.length
					? 'All fields must be filled'
					: 'Invalid credentials'
			);
			dispatch(logout());
			localStorage.removeItem('user');
		}
	};

	return (
		<div className='flex flex-col gap-4 justify-center items-center h-screen bg-gray-100'>
			<h1 className='text-3xl font-bold'>Smart Recipes</h1>
			<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[95vw] max-w-[375px]'>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-md font-bold mb-2'
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
						className='block text-gray-700 text-md font-bold mb-2'
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
				<div className='flex items-center justify-between gap-4'>
					<button
						onClick={handleLogin}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1'
						type='submit'>
						Log In
					</button>
					<button
						onClick={handleSignup}
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1'
						type='submit'>
						Sign Up
					</button>
				</div>
				{errorMsg.length > 0 && (
					<p className='text-red-500 text-md font-bold italic mt-2'>
						{errorMsg}
					</p>
				)}
			</form>
		</div>
	);
};

export default Login;
