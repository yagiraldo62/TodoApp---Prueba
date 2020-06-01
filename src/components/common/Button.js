import React from 'react';
import Btn from '@material-ui/core/Button';
import { Loader } from 'react-loaders';
export const Button = (props) => {
	const { children, loading = false, disabled = false } = props;
	return (
		<Btn {...props} disabled={loading || disabled} style={{ textTransform: 'capitalize' }}>
			{!loading ? children : <Loader type="line-scale" active style={{ transform: 'scale(0.6)' }} />}
		</Btn>
	);
};
