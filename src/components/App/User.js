import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { logOut } from '../../utils/helpers/UserStorage';
const useStyles = makeStyles((theme) => ({
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	capitalized: {
		textTransform: 'capitalize',
		fontWeight: 'Bold',
	},
	infoUser: {
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
}));

const HelpText = styled.small`
	display: inline-block;
	max-width: 100%;
	color: #ccc;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export default () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const classes = useStyles();

	const user = useSelector((state) => state.User.user);

	const menuId = 'UserOptionsMenu';

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem className={`${classes.capitalized} ${classes.infoUser}`}>
				{user.Name} <br />
				<HelpText>{user.Email}</HelpText>
			</MenuItem>
			<MenuItem onClick={() => logOut()}>Salir</MenuItem>
		</Menu>
	);

	return (
		<>
			<IconButton
				edge="end"
				aria-label="account of current user"
				aria-controls={menuId}
				aria-haspopup="true"
				onClick={handleProfileMenuOpen}
				color="inherit"
				className={classes.sectionMobile}
			>
				<AccountCircle />
			</IconButton>

			<Button
				aria-controls={menuId}
				aria-haspopup="true"
				onClick={handleProfileMenuOpen}
				color="inherit"
				className={`${classes.capitalized} ${classes.sectionDesktop}`}
			>
				<AccountCircle /> &nbsp;
				{user.Name}
			</Button>
			{renderMenu}
		</>
	);
};
