import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const CheckBox = ({ value, color = 'primary', label }) => (
	<FormControlLabel control={<Checkbox value={value} color={color} />} label={label} />
);
