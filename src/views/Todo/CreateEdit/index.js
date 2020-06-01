import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TodoForm from './CreateEditTodoForm';
import { Button } from '../../../components/common/Button';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ open, setOpen, todo = { _id: null }, setTodo, loading, save, update }) => {
	const classes = useStyles();

	const type = todo._id ? 'edit' : 'create';

	const handleClose = () => {
		setOpen(false);
	};

	const saveOrUpdate = () => {
		if (todo._id) update();
		else save();
	};

	return (
		<div>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{type === 'create' ? 'Nueva Tarea' : 'Editar Tarea'}
						</Typography>
						<Button
							autoFocus
							color="secondary"
							variant="contained"
							onClick={saveOrUpdate}
							loading={loading}
							disabled={!todo.Name}
						>
							{type === 'create' ? 'Guardar' : 'Editar'}
						</Button>
					</Toolbar>
				</AppBar>
				<TodoForm type={type} todo={todo} setTodo={setTodo} save={saveOrUpdate} />
			</Dialog>
		</div>
	);
};
