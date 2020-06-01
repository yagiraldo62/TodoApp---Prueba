import { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import palette from '../palette';

/**
 * @param type "light" | "dark"
 * @returns MuiTheme
 */
export default () => {
	const [theme, setTheme] = useState({});
	// listen to theme changes
	const type = useSelector((state) => state.App.theme);
	useEffect(() => {
		setTheme({
			palette: {
				type,
				...palette,
			},
		});
	}, [type]);

	return createMuiTheme(theme);
};
