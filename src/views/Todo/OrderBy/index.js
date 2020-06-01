import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	orderContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

export default ({ setOrder }) => {
	const classes = useStyles();
	return (
		<FormControl component="fieldset" className={classes.orderContainer}>
			<FormLabel component="legend">Ordenar por</FormLabel>
			<RadioGroup
				row
				aria-label="position"
				name="position"
				defaultValue="creation"
				onChange={(e) => setOrder(e.target.value)}
			>
				<FormControlLabel value="creation" control={<Radio color="secondary" />} label="F Creación" />
				<FormControlLabel value="priority" control={<Radio color="secondary" />} label="Prioridad" />
				<FormControlLabel value="duedate" control={<Radio color="secondary" />} label="F Vencimiento" />
			</RadioGroup>
		</FormControl>
	);
};
