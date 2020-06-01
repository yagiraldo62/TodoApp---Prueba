import jwt from 'jsonwebtoken';
import config from '../../../config';
const { key } = config;
export const Errors = ({ Name = null, Email, Password, ConfPassword = null }, login = true) => {
	const Errors = {};
	if (!Email) Errors.Email = 'The Email is required';
	if (!Password) Errors.Password = 'The Password is required';

	// if signup, verify  name and pass conf
	if (!login && !Name) Errors.Name = 'The Name is required';
	if (!login && !ConfPassword) Errors.ConfPassword = 'The Password Confirmation is required';
	if (!login && ConfPassword !== Password)
		Errors.ConfPassword = 'The Password´s and Password Confirmation´s fields does not match';

	return Object.keys(Errors).length ? Errors : false;
};

// generate token from user id
export const generateToken = (id) => jwt.sign({ sub: id, exp: Date.now() + 60 * 60 }, key);
