import { User } from '../actionTypes';
export const setUser = (user) => ({
	type: User.SET,
	payload: user,
});

export const setUserLoading = (flag) => ({
	type: User.SET_LOADING,
	payload: flag,
});
