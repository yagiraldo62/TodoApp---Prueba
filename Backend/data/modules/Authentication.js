import { Users } from '../db';
import bcrypt from 'bcrypt';

// crypt complexity
const cc = 10;

// search the user to authenticate
export const Login = async ({ Email, Password }) => {
	return new Promise((resolve, reject) => {
		Users.findOne({ Email }).then(async (User) => {
			if (User === null) return resolve(User);
			User.id = User._id;
			const valid = await verify(Password, User.Password);
			return valid ? resolve(User) : resolve(null);
		});
	});
};

export const Me = async (id) => {
	return new Promise((resolve, reject) => {
		Users.findById(id).then((User) => {
			if (User !== null) User.id = User._id;
			return resolve(User);
		});
	});
};

// search the Email to validate Email does not exist in another account
const ValidateExistence = (Email) => {
	return new Promise((resolve, reject) => {
		Users.findOne({ Email }).then((User) => {
			return resolve(User);
		});
	});
};

export const Register = async ({ Name, Email, Password }) => {
	// validate Email existence
	const existence = await ValidateExistence(Email);

	// if true, notify the guest that the Email is aready busy.
	// if false, continue creating the new user
	if (existence) return Promise.reject({ existent: true, message: 'Existent Email' });

	Password = await crypt(Password);

	// create user row
	const newUser = Users({ Name, Email, Password });
	newUser.id = newUser._id;

	return new Promise((res, rej) => {
		// Save the new user
		newUser.save((error) => {
			// if error reject
			if (error) return rej(error);

			res(newUser);
		});
	});
};

// crypt user password
const crypt = (Password) =>
	new Promise((resolve, reject) => {
		bcrypt.hash(Password, cc, (err, encrypted) => {
			resolve(encrypted);
		});
	});

// verify user password
const verify = (Match, Password) =>
	new Promise((resolve, reject) => {
		bcrypt.compare(Match, Password, function (err, result) {
			resolve(result);
		});
	});
