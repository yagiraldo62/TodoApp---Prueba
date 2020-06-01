import React from 'react';
import { navigate } from '@reach/router';
import { getUser } from '../utils/helpers/UserStorage';
import RedirectionMessage from './RedirectionMessage';

export default ({ Component, ...props }) => {
	if (getUser()) {
		navigate('/');
		return <RedirectionMessage>Welcome</RedirectionMessage>;
	}
	return <Component {...props} />;
};
