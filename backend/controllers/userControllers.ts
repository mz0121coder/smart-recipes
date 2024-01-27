import { Request, Response, NextFunction } from 'express';
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id: string) =>
	jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });

// login user
const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		// create a token for logged in user
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// signup user
const signupUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await User.signup(email, password);
		// create a token for signed up user
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export { loginUser, signupUser };
