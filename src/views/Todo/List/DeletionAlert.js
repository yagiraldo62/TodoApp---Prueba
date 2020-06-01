import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '../../../components/common/Button';
export default ({ open, closeDeletionAlert, DeleteSelectedTodo }) => {
	const handleClose = () => {
		closeDeletionAlert();
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Eliminar Tarea</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						No podra ser restaurada en un futuro.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={() => DeleteSelectedTodo()} color="secondary" autoFocus>
						Borrar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
