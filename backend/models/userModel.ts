import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose;

interface User {
	email: string;
	password: string;
}

const userSchema = new Schema<User>({
	email: { type: String, required: true, unique: true },
	password: { type: String, password: { type: String, required: true } },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
	// validation
	if (!email || !password) throw Error('All fields must be filled');
	if (!validator.isEmail(email)) throw Error('Email is not valid');
	if (!validator.isStrongPassword(password))
		throw Error('Password is not strong enough');

	const exists = await this.findOne({ email });
	if (exists) throw Error('Email already in use');
	// generate random string + encrypt password
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	// create document for user in db collection
	const user = await this.create({ email, password: hash });

	return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
	// validation
	if (!email || !password) throw Error('All fields must be filled');
	const user = await this.findOne({ email });
	if (!user) throw Error('Incorrect email');
	// check if password matches encryption
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw Error('Incorrect password');

	return user;
};

module.exports = mongoose.model('User', userSchema);
