import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import ThemeSelector from '../../../components/App/ThemeSelector';
import Copyright from '../../../components/App/Copyright';
import { useStyles, ThemeSelectorContaner, SignupLink } from './styles';
import { Error as ErrorMsg } from '../../../components/App/Message';
import { Textfield, PasswordField } from '../../../components/Forms/Input';
import { Button } from '../../../components/common/Button';
// login logic
import LoginWrapper from './wrapper';

const Login = ({ Email, setEmail, Password, setPassword, loading, login, Errors }) => {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<ThemeSelectorContaner>
					<ThemeSelector />
				</ThemeSelectorContaner>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Iniciar Sesión
				</Typography>
				<form className={classes.form} noValidate onSubmit={login}>
					<Textfield
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Correo Electronico"
						autoComplete="email"
						type="email"
						autoFocus
						value={Email}
						onChange={(e) => setEmail(e.target.value)}
						error={Errors.Email === true}
						helperText={Errors.Email ? 'Ingresa tu correo electronico' : null}
					/>
					<PasswordField
						variant="outlined"
						margin={20}
						required
						fullWidth
						name="password"
						label="Contraseña"
						autoComplete="current-password"
						value={Password}
						onChange={(e) => setPassword(e.target.value)}
						error={Errors.Password === true}
						helperText={Errors.Password ? 'Ingresa tu contraseña' : null}
					/>
					{Errors.Auth && <ErrorMsg Title="Error de autenticación" Message={Errors.Auth} />}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						loading={loading}
					>
						Ingresar
					</Button>
					<SignupLink />
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default LoginWrapper(Login);
