import React from 'react';
import { navigate } from '@reach/router';
import { getUser } from '../utils/helpers/UserStorage';
import RedirectionMessage from './RedirectionMessage';
import { setUser, setUserLoading } from '../store/actions/User.actions';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './Layout';
export default ({ Component, ...props }) => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.User.loading);
	const SetUser = (user) => dispatch(setUser(user));
	const SetLoading = (Loading) => dispatch(setUserLoading(Loading));
	// if access-token does not exists, redirect to login
	// else returns component
	if (!getUser(SetUser, SetLoading, loading, true)) {
		navigate('/login');
		return <RedirectionMessage>Unauthorized</RedirectionMessage>;
	}
	return (
		<Layout>
			<Component {...props} />
		</Layout>
	);
};
