import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddTwoTone';
import TodoList from './List/';
import CreateEditTodo from './CreateEdit/';
import TodosWrapper from './wrapper';
import Order from './OrderBy/';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: '1em',
		backgroundColor: theme.palette.background.paper,
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2.5),
		right: theme.spacing(2.5),
	},
	actionBtn: {
		marginRight: '10px',
	},
}));

const Todos = ({
	openCreateEditTodoModal,
	setOpenCreateEditTodoModal,
	currentTodo,
	setCurrentTodo,
	loadingForm,
	save,
	update,
	loadingTodos,
	todos,
	toggleCompletion,
	deletionAlertOpened,
	closeDeletionAlert,
	openDeletionAlert,
	DeleteSelectedTodo,
	setOrder,
	openToast,
	handleToastClose,
	toastMessage,
	overdueTodos,
	willBeDueSoonTodos,
}) => {
	const classes = useStyles();

	const listProps = {
		loading: loadingTodos,
		todos,
		toggleCompletion,
		deletionAlertOpened,
		closeDeletionAlert,
		openDeletionAlert,
		DeleteSelectedTodo,
	};

	return (
		<>
			<Typography variant="h4" component="h2">
				Mis tareas
			</Typography>
			{overdueTodos && <Alert severity="error">Hay tareas vencidas sin completar</Alert>}
			{willBeDueSoonTodos && (
				<Alert severity="warning">Hay tareas por cumplir su fecha de vencimiento sin completar</Alert>
			)}
			<Order setOrder={setOrder} />
			<TodoList setTodo={setOpenCreateEditTodoModal} {...listProps} />
			<Fab className={classes.fab} color="primary" onClick={() => setOpenCreateEditTodoModal(true)}>
				<AddIcon />
			</Fab>
			<CreateEditTodo
				open={openCreateEditTodoModal}
				setOpen={setOpenCreateEditTodoModal}
				todo={currentTodo}
				setTodo={setCurrentTodo}
				loading={loadingForm}
				save={save}
				update={update}
			/>
			<Snackbar open={openToast} autoHideDuration={750} onClose={handleToastClose} message={toastMessage} />
		</>
	);
};

export default TodosWrapper(Todos);
