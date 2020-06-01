import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import MSelect from '@material-ui/core/Select';
import { W100 } from '../common/Box';

const W100TextField = W100(TextField);
export const Textfield = (props) => <W100TextField {...props} />;

export const PasswordField = (props) => {
	const [show, setShow] = useState(false);
	const { label, margin, helperText, error = false } = props;
	const handleClickShowPassword = () => setShow(!show);
	const w100 = { width: '100%' };
	return (
		<FormControl required variant="outlined" style={{ ...w100, marginTop: `${margin}px` }}>
			<InputLabel error={error} htmlFor={`${label}-password`}>
				{label}
			</InputLabel>
			<OutlinedInput
				style={{ ...w100 }}
				id={`${label}-password`}
				type={show ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							edge="end"
						>
							{!show ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
				{...props}
				margin={'none'}
			/>
			{helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export const Select = (props) => {
	const {
		value,
		onChange,
		label = 'Select',
		color = 'inherit',
		id = 'outlined-age-native-simple',
		name = null,
		children,
	} = props;
	return (
		<FormControl variant="outlined" style={{ width: '100%' }} color={color}>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<MSelect
				native
				value={value}
				onChange={onChange}
				label={label}
				inputProps={{
					name,
					id,
				}}
			>
				{children}
			</MSelect>
		</FormControl>
	);
};
