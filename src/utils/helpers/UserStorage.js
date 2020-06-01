import { Me } from '../../services/User.service';
// import jwt from 'jwt-decode';
// encapsulate user comprobation
/**
 *
 * @param {Function} searchUser function to be called to seach user if does not exist in localStorage
 * @param {Boolean} loading user search loading status, if true, @returns true
 * @returns {Boolean} acces to private routes
 */

export const getUser = (setUserToStore, setUserLoadingToStore, loading, Protected = false) => {
	// console.log(new Date(jwt(localStorage.getItem('access-token')).exp * 1000));
	// console.log(moment.unix(jwt(localStorage.getItem('access-token')).exp).format('MM/DD/YYYY'));
	if (loading) return true;
	let flag = localStorage.getItem('access-token');
	if (flag && !Protected) return true;
	const user = localStorage.getItem('user');
	verifyUser(flag, user, setUserToStore, setUserLoadingToStore);
	return Boolean(flag);
};

// Set user in localStorage
export const setUser = (user) => {
	const User = JSON.stringify(user);
	localStorage.setItem('user', User);
};

// Get token from localStorage
export const getToken = () => {
	return localStorage.getItem('access-token');
};

// Set token in localStorage
export const setToken = (token) => {
	return localStorage.setItem('access-token', token);
};

/**
 * @param {String||null} token acces-token
 * @param {Object||null} user user in localStogare
 * @param {Function} calback user in localStogare
 * if user does not exist, make a request to fetch user information
 * *    save user information in localStorage
 * *    @returns true
 * else @returns true
 */
const verifyUser = (token, user, setUserToStore, setUserLoadingToStore) => {
	if (!token) return true;
	if (user) return setUserToStore(JSON.parse(user));
	searchUser(setUserToStore, setUserLoadingToStore);
};

const searchUser = async (setUserToStore, setUserLoadingToStore) => {
	setUserLoadingToStore(true);
	Me()
		.then(({ data }) => {
			setUser(data.Me);
			setUserToStore(data.Me);
			setUserLoadingToStore(false);
		})
		.catch((err) => console.error(err));
};

export const logOut = () => {
	localStorage.removeItem('access-token');
	localStorage.removeItem('user');
	window.location.replace('/login');
};
