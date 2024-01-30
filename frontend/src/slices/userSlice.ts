import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: { user: { email: '', token: '' } },
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: state => {
			state.user = { email: '', token: '' };
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice;
