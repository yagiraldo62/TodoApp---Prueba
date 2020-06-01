import React, { useState } from 'react';
import { Login } from '../../../services/Auth.service';
import { setToken } from '../../../utils/helpers/UserStorage';
const location = window.location;
export default (LoginComponent) => {
	return () => {
		const [Email, setEmail] = useState('');
		const [Password, setPassword] = useState('');
		const [loading, setLoading] = useState(false);
		const [Errors, setErrors] = useState({});

		const login = (e) => {
			e.preventDefault();
			if (!validations()) return false;
			setLoading(true);
			Login(Email, Password)
				.then(({ data }) => {
					setToken(data.token);
					setLoading(false);
					location.reload();
				})
				.catch((err) => {
					setLoading(false);
					setErrors({
						Auth: err.response ? err.response.data.message : err.message,
					});
				});
		};

		const validations = () => {
			const errors = {};
			if (!Email.length) errors.Email = true;
			if (!Password.length) errors.Password = true;

			setErrors(errors);
			return Object.keys(errors).length === 0;
		};

		const props = {
			Email,
			setEmail,
			Password,
			setPassword,
			loading,
			login,
			Errors,
		};
		return <LoginComponent {...props} />;
	};
};
