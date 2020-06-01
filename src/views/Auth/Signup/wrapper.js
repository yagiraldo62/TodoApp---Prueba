import React, { useState } from 'react';
import { Signup } from '../../../services/Auth.service';
import { setToken } from '../../../utils/helpers/UserStorage';
const location = window.location;
export default (SignupComponent) => {
	return () => {
		const [Name, setName] = useState('');
		const [Email, setEmail] = useState('');
		const [Password, setPassword] = useState('');
		const [PasswordConf, setPasswordConf] = useState('');
		const [Errors, setErrors] = useState('');
		const [loading, setLoading] = useState(false);

		const signup = (e) => {
			e.preventDefault();
			if (!validations()) return;
			setLoading(true);
			Signup({ Name, Email, Password, ConfPassword: PasswordConf })
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
			const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const errors = {};
			if (!Name.length) errors.Name = true;
			if (!Email.length) errors.Email = true;
			if (!emailExp.test(Email)) errors.Email = true;
			if (!Password.length) errors.Password = true;
			if (!PasswordConf.length) errors.PasswordConf = true;
			if (PasswordConf !== Password) errors.PasswordConfMatch = true;

			setErrors(errors);
			return Object.keys(errors).length === 0;
		};

		const props = {
			Name,
			setName,
			Email,
			setEmail,
			Password,
			setPassword,
			PasswordConf,
			setPasswordConf,
			loading,
			signup,
			Errors,
		};
		return <SignupComponent {...props} />;
	};
};
