import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Textfield, Select } from '../../../components/Forms/Input';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
const useStyle = makeStyles((theme) => ({
	form: {
		padding: theme.spacing(3),
		marginTop: theme.spacing(3),
		width: '100%',
	},
}));

export default ({ type, todo, setTodo, save }) => {
	const [dueDate, setDueDate] = useState(null);
	const setValue = (newVal) => {
		setTodo({
			...todo,
			...newVal,
		});
	};
	const classes = useStyle();

	useEffect(() => {
		if (todo.DueDate) setDueDate(moment.unix(todo.DueDate).format('YYYY-MM-DDTHH:mm'));
		else {
			setDueDate(null);
		}
		if (!todo.Priority) setValue({ Priority: 3 });
	}, [todo]);

	const setDate = (date) => setValue({ DueDate: moment(date).unix() });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!todo.Name) return;
		save();
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid spacing={4} item xs={12}>
					<Textfield
						label="Tarea"
						variant="outlined"
						color="secondary"
						value={todo.Name}
						onChange={(e) => setValue({ Name: e.target.value })}
					/>
				</Grid>
				<Grid spacing={4} item xs={12}>
					<Textfield
						multiline
						rows={3}
						label="Descripción"
						variant="outlined"
						color="secondary"
						value={todo.Description}
						onChange={(e) => setValue({ Description: e.target.value })}
					/>
				</Grid>

				<Grid spacing={4} item xs={12} sm={6}>
					<Select
						label="Prioridad"
						variant="outlined"
						color="secondary"
						value={todo.Priority}
						onChange={(e) => setValue({ Priority: Number(e.target.value) })}
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
					</Select>
				</Grid>

				<Grid spacing={4} item xs={12} sm={6}>
					<Textfield
						label="Fecha de vencimiento"
						variant="outlined"
						color="secondary"
						type="datetime-local"
						value={dueDate}
						format="yyyy-MM-dd "
						onChange={(e) => setDate(e.target.value)}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</Grid>
		</form>
	);
};
