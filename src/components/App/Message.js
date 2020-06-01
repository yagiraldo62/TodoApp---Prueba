import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Grow from '@material-ui/core/Grow';
import styled from 'styled-components';

const SAlert = styled(Alert)`
	margin-top: 2em;
`;

export const Error = ({ Title = null, Message = null }) => (
	<Grow in={Message !== null}>
		<SAlert severity="error">
			{Title && <AlertTitle>{Title}</AlertTitle>}
			{Message}
		</SAlert>
	</Grow>
);
