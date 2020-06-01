import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appToggleTheme } from '../../store/actions/App.actions';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4TwoTone';
export default ({ size = 'medium', white = false }) => {
	const type = useSelector((state) => state.App.theme);
	const dispatch = useDispatch();
	const toggleTheme = () => dispatch(appToggleTheme());

	return (
		<IconButton size={size} aria-label="Theme Selector" onClick={toggleTheme}>
			{type === 'dark' ? (
				<Brightness7Icon color="inherit" />
			) : (
				<Brightness4Icon color="primary" style={{ color: white ? 'white' : null }} />
			)}
		</IconButton>
	);
};
