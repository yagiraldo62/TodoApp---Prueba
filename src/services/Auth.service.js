import { Fetch, body } from '../utils/helpers/restClient';
export const Login = (Email, Password) => {
	return new Promise((resolve, reject) => {
		Fetch.post('/auth/login', body({ Email, Password }))
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};

export const Signup = ({ Name, Email, Password, ConfPassword }) => {
	return new Promise((resolve, reject) => {
		Fetch.post('/auth/register', body({ Name, Email, Password, ConfPassword }))
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};
