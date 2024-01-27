import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
	// verify authentication
	const { authorization } = req.headers;
	if (!authorization)
		return res.status(401).json({ error: 'Authorization token required' });

	const token = authorization.split(' ')[1];

	try {
		// get id by verifying token and jwt secret
		const { _id } = jwt.verify(token, process.env.JWT_SECRET);
		// find document matching _id from token, show just the _id property
		req.user = await User.findOne({ _id }).select('_id');
		next();
	} catch (error) {
		// prevent access to recipe controller functions if user is not authenticated
		console.log(error);
		res.status(401).json({ error: 'Request is not authorized' });
	}
};

export default requireAuth;
