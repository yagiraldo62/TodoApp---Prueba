import { App } from '../actionTypes';
const themeType = localStorage.getItem('theme') || 'light';
const AppState = {
	theme: themeType,
};
export default (state = AppState, action) => {
	switch (action.type) {
		case App.TOGGLE_THEME:
			return {
				...state,
				theme: revertAndSaveTheme(state.theme),
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
