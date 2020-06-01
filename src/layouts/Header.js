import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../assets/img/logo.svg';
import ThemeSelector from '../components/App/ThemeSelector';
import User from '../components/App/User';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		marginBottom: '2.5em',
	},
	logo: {
		width: '1.5em',
		marginLeft: '.3em',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2em',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8em',
		},
	},
}));

export default function PrimarySearchAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h4">
						Todo App <img src={Logo} className={classes.logo} alt="Todo App Logo" />
					</Typography>
					<div className={classes.grow} />
					<ThemeSelector white={true} />
					<User />
				</Toolbar>
			</AppBar>
		</div>
	);
}
