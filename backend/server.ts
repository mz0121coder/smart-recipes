require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// routes for recipes and login + signup
import recipeRoutes from './routes/recipeRoutes';
import userRoutes from './routes/userRoutes';

// express app
const app = express();
const MONGO_URI: string | undefined = process.env.MONGO_URI;

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/user', userRoutes);

// connect to db
if (MONGO_URI)
	mongoose
		.connect(MONGO_URI)
		.then(() =>
			// listen for requests
			app.listen(process.env.PORT, () =>
				console.log(`connected to db & listening on port ${process.env.PORT}`)
			)
		)
		.catch(error => console.log(error));
