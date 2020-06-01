import { User as UserTypes } from '../actionTypes';
import { getUser } from '../../utils/helpers/UserStorage';
const user = getUser();
const UserState = {
	user,
	loading: false,
};
export default (state = UserState, action) => {
	switch (action.type) {
		case UserTypes.SET:
			return {
				...state,
				user: action.payload,
			};
		case UserTypes.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};

/**
 *
 * @param {*} theme "light" || "dark"  - current theme
 * revert the theme, save it into localStorage
 * @returns reverted theme
 */
const revertAndSaveTheme = (theme) => {
	const Theme = theme === 'light' ? 'dark' : 'light';
	localStorage.setItem('theme', Theme);
	return Theme;
};
