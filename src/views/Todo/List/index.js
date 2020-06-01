import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Todo from './Todo';
import Box from '@material-ui/core/Box';
import TodoListWrapper from './wrapper';
import { Loader } from 'react-loaders';
import { W100 } from '../../../components/common/Box';
import { Centered } from '../../../components/common/Flex';
import DeletionAlert from './DeletionAlert';
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: '1em',
		marginBottom: '6em',
		backgroundColor: theme.palette.background.paper,
	},
	loader: {
		marginTop: '5em',
	},
	noTodos: {
		textAlign: 'center',
		color: '#ccc',
		fontSize: '20px',
		padding: theme.spacing(2),
	},
}));

const CenteredContainer = W100(Centered(Box));
const Loading = (props) => (
	<CenteredContainer {...props}>
		<Loader type="line-scale" active />
	</CenteredContainer>
);

const NoTodos = (props) => <CenteredContainer {...props}>No has registrado tareas aun.</CenteredContainer>;

const TodoList = ({
	loading,
	todos,
	toggleCompletion,
	deletionAlertOpened,
	closeDeletionAlert,
	openDeletionAlert,
	DeleteSelectedTodo,
	setTodo,
}) => {
	const classes = useStyles();

	return (
		<>
			{loading ? (
				<Loading className={classes.loader} />
			) : (
				<List className={classes.root}>
					{todos.map((todo) => {
						return (
							<Todo
								todo={todo}
								key={todo._id}
								toggleCompletion={toggleCompletion}
								openDeletionAlert={openDeletionAlert}
								setTodo={setTodo}
							/>
						);
					})}
					{!todos.length && <NoTodos className={classes.noTodos} />}
				</List>
			)}
			<DeletionAlert
				open={deletionAlertOpened}
				closeDeletionAlert={closeDeletionAlert}
				DeleteSelectedTodo={DeleteSelectedTodo}
			/>
		</>
	);
};

export default TodoListWrapper(TodoList);
