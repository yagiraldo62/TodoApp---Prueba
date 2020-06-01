import React, { useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
// GraqhQl Queries
import { CreateTodo, UpdateTodo, ReadTodos, DeleteTodo } from '../../services/queries';

// heare all the todo functionality, passed as props to children
export default (TodoComponent) => {
	return () => {
		// GraphQl request functions
		const { loading: loadingTodos, error: queryError, data } = useQuery(ReadTodos);
		const [updateTodo, { loading: loadUpdate }] = useMutation(UpdateTodo);
		const [createTodo, { loading: loadCreate }] = useMutation(CreateTodo);
		const [deleteTodo] = useMutation(DeleteTodo);

		// edit || create modal open?
		const [openCreateEditTodoModal, setOpenModal] = useState(false);

		// order by option
		const [order, setOrder] = useState('creation');

		// task to create or update
		const [currentTodo, setCurrentTodo] = useState(false);

		const [todosLoaded, setTodosLoaded] = useState(false);
		const [todos, setTodos] = useState([]);
		const [deletion, setDeletion] = useState(null);

		const [todosBckup, setTodosBckup] = useState([]);

		const [openToast, setOpenToast] = useState(false);
		const [toastMessage, setToastMessage] = useState(false);

		const [overdueTodos, setOverdueTodos] = useState(false);
		const [willBeDueSoonTodos, setWillBeDueSoonTodos] = useState(false);

		//check over due tasks
		const chechOverDueTodos = () => {
			setOverdueTodos(false);
			setWillBeDueSoonTodos(false);
			todosBckup.map((todo) => {
				const { DueDate, Completed } = todo;
				if (!DueDate) return;
				if (moment.unix(DueDate) <= moment() && !Completed) setOverdueTodos(true);
				else if (moment.unix(DueDate) <= moment().add(1, 'days') && !Completed) setWillBeDueSoonTodos(true);
			});
		};

		// sort functions

		const creationSort = (a, b) => {
			if (a.CreatedAt < b.CreatedAt) {
				return 1;
			}
			if (a.CreatedAt > b.CreatedAt) {
				return -1;
			}
			return 0;
		};

		const prioritySort = (a, b) => {
			if (a.Priority < b.Priority) {
				return -1;
			}
			if (a.Priority > b.Priority) {
				return 1;
			}
			return 0;
		};

		const dueDateSort = (a, b) => {
			const da = a.DueDate ? a.DueDate : 10000000000000000000000;
			const db = b.DueDate ? b.DueDate : 10000000000000000000000;
			if (da < db) {
				return -1;
			}
			if (da > db) {
				return 1;
			}
			return 0;
		};

		// catch todos and set them in the state
		// catch ReadTodos query error
		useMemo(() => {
			if (queryError) {
				console.error(queryError);
			}
			if (data && !todosLoaded) {
				if (!data.ReadTodos) return;
				setTodosLoaded(true);
				setTodosBckup(data.ReadTodos);
			}

			if (order === 'creation') {
				setTodos(todosBckup.sort(creationSort));
			}
			if (order === 'priority') {
				setTodos(todosBckup.sort(prioritySort));
			}
			if (order === 'duedate') {
				setTodos(todosBckup.sort(dueDateSort));
			}

			chechOverDueTodos();
		}, [data, queryError, order, todosBckup]);

		//set task complete
		const toggleCompletion = (id) => {
			// update todos
			let current = null;
			const newTodos = todosBckup.map((todo) => {
				if (todo._id !== id) return todo;
				todo.Completed = !todo.Completed;
				current = todo;
				return todo;
			});
			setTodosBckup(newTodos);
			// update mutation request
			const { _id, Name, Description, Completed, DueDate, Priority } = current;
			const todo = { _id, Name, Description, Completed, DueDate, Priority };
			updateTodo({ variables: { todo } });

			// success message
			setToastMessage('Tarea actualizada');
			setOpenToast(true);
		};

		const DeleteSelectedTodo = () => {
			//update todos
			let current = null;
			todosBckup.map((todo) => (todo._id === deletion ? (current = todo) : null));
			const newTodos = todos.filter((todo) => todo._id !== deletion);
			setTodosBckup(newTodos);
			// delete mutation request
			const { _id } = current;
			deleteTodo({ variables: { todo: _id } });
			setDeletion(null);
			// success message
			setToastMessage('Tarea eliminada');
			setOpenToast(true);
		};

		// open || close modal
		// if payload false, closes the modal
		// if payload is an object, set currentTodo to edit
		// if payload === true, set a blank task to currentTodo to create new
		const setOpenCreateEditTodoModal = (payload) => {
			if (!payload) {
				return setOpenModal(false);
			}

			if (typeof payload === 'object') {
				setCurrentTodo(payload);
			} else {
				setCurrentTodo({ _id: null });
			}
			setOpenModal(true);
		};

		const saveNewTodo = async () => {
			const { Name = '', Description = '', Priority = 3, DueDate = null } = currentTodo;
			const todo = { Name, Description, Priority, DueDate };
			// create mutation request
			const { data } = await createTodo({ variables: { todo } });
			// update todos
			setTodosBckup([...todosBckup, data.CreateTodo]);
			//close modal
			setOpenCreateEditTodoModal(false);

			// success message
			setToastMessage('Tarea creada');
			setOpenToast(true);
		};

		const updateCurrentTodo = async () => {
			const { _id, Name = '', Description = '', Priority = 3, DueDate = null } = currentTodo;
			const todo = { _id, Name, Description, Priority, DueDate };
			// update mutation request
			const { data } = await updateTodo({ variables: { todo } });
			// update todos
			const updatedTodo = data.UpdateTodo;
			const newTodos = todosBckup.map((todo) => {
				if (todo._id === updatedTodo._id) todo = updatedTodo;
				return todo;
			});
			setTodosBckup(newTodos);
			// close modal
			setOpenCreateEditTodoModal(false);

			// success message
			setToastMessage('Tarea actualizada');
			setOpenToast(true);
		};

		const loadingForm = loadUpdate || loadCreate;

		const handleToastClose = () => setOpenToast(false);

		const props = {
			openCreateEditTodoModal,
			setOpenCreateEditTodoModal,
			currentTodo,
			setCurrentTodo,
			loadingForm,
			save: saveNewTodo,
			update: updateCurrentTodo,
			loadingTodos,
			todos,
			toggleCompletion,
			// if there is an id to delete, open confirmation modal
			deletionAlertOpened: deletion !== null,
			closeDeletionAlert: () => setDeletion(null),
			openDeletionAlert: (id) => setDeletion(id),
			setOrder,
			DeleteSelectedTodo,
			openToast,
			handleToastClose,
			toastMessage,
			overdueTodos,
			willBeDueSoonTodos,
		};
		return <TodoComponent {...props} />;
	};
};
