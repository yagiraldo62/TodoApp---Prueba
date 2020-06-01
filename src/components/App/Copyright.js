import React from 'react';
import Typography from '@material-ui/core/Typography';

export default () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			Copyright © Todo App - Yeferson Giraldo
			<br />
			Test For Evolution
			<br /> {new Date().getFullYear()}
		</Typography>
	);
};
