import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditTwoTone';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ErrorIcon from '@material-ui/icons/Error';
const useStyles = makeStyles((theme) => ({
	actionBtn: {
		marginRight: '10px',
	},
	actionBtnContainer: {
		[theme.breakpoints.down('sm')]: {
			position: 'relative',
			marginTop: theme.spacing(3),
			display: 'flex',
			justifyContent: 'flex-end',
		},
	},
	infoContainerMobile: {
		width: '100%',
		alignItems: 'center',
		marginLeft: theme.spacing(5),
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},
	infoContainer: {
		width: '100%',
		alignItems: 'center',
		marginLeft: theme.spacing(5),
		display: 'block',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	dueDate: {
		display: 'inline-flex',
		alignItems: 'center',
	},
	priority: {
		color: '#797D7F',
		display: 'block',
		marginBottom: theme.spacing(1),
	},
}));

// DueDate Warnings
// yellow 1 day
// red 5 hours

// if warning, returns warning color
// else, returns gray color
const dueDateColor = (date, Completed) => {
	if (Completed) return '#ccc';
	if (moment.unix(date) <= moment()) return '#F44336';
	if (moment.unix(date) <= moment().add(5, 'hours')) return '#FF8A65';
	else if (moment.unix(date) <= moment().add(1, 'days')) return '#F4D03F';
	else return '#ccc';
};

// if date is near returns warning icon
// else returns clock icon
const DateIcon = ({ date, Completed }) => {
	if (moment.unix(date) <= moment() && !Completed) return <ErrorIcon />;
	else if (moment.unix(date) <= moment().add(1, 'days') && !Completed) return <InfoTwoToneIcon />;
	else return <ScheduleTwoToneIcon />;
};

export default ({ todo, toggleCompletion, openDeletionAlert, setTodo }) => {
	const classes = useStyles();
	const { _id, Name, Description, Completed, DueDate, Priority } = todo;
	const printDate = (date) =>
		moment.unix(date) <= moment().add(1, 'days') ? moment.unix(date).fromNow() : moment.unix(date).calendar();
	return (
		<>
			<ListItem role={undefined} dense>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={Completed}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': _id }}
						onClick={() => toggleCompletion(_id)}
					/>
				</ListItemIcon>
				<ListItemText id={_id} primary={Name} secondary={Description} />
				<ListItemSecondaryAction className={classes.actionBtnContainer}>
					<div className={classes.infoContainerMobile}>
						<span className={classes.priority}>Prioridad {Priority}</span>
						{DueDate && (
							<small className={classes.dueDate} style={{ color: dueDateColor(DueDate, Completed) }}>
								<DateIcon date={DueDate} Completed={Completed} /> &nbsp; {printDate(DueDate)}
							</small>
						)}
					</div>
					<IconButton
						edge="end"
						aria-label="comments"
						className={classes.actionBtn}
						onClick={() => setTodo(todo)}
						color="primary"
					>
						<EditIcon />
					</IconButton>
					<IconButton
						edge="end"
						aria-label="Delete Todo"
						color="secondary"
						onClick={() => openDeletionAlert(_id)}
					>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			<div className={classes.infoContainer}>
				<span className={classes.priority}>Prioridad {Priority}</span>
				{DueDate && (
					<small className={classes.dueDate} style={{ color: dueDateColor(DueDate, Completed) }}>
						<DateIcon date={DueDate} Completed={Completed} /> &nbsp; {printDate(DueDate)}
					</small>
				)}
			</div>
			<Divider component="li" />
		</>
	);
};
