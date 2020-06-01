import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import ThemeSelector from '../../../components/App/ThemeSelector';
import Copyright from '../../../components/App/Copyright';
import { useStyles, ThemeSelectorContaner, LoginLink } from './styles';
import { Textfield, PasswordField } from '../../../components/Forms/Input';
import { Error as ErrorMsg } from '../../../components/App/Message';
import { Button } from '../../../components/common/Button';
// Signup logic
import SignupWrapper from './wrapper';

const Signup = ({
	Name,
	setName,
	Email,
	setEmail,
	Password,
	setPassword,
	PasswordConf,
	setPasswordConf,
	loading,
	signup,
	Errors,
}) => {
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
					Crear Cuenta
				</Typography>
				<form className={classes.form} noValidate onSubmit={signup}>
					<Textfield
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Nombre"
						autoComplete="name"
						autoFocus
						value={Name}
						onChange={(e) => setName(e.target.value)}
						error={Errors.Name === true}
						helperText={Errors.Name ? 'Ingresa tu Nombre' : null}
					/>
					<Textfield
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Correo Electronico"
						autoComplete="email"
						type="email"
						value={Email}
						onChange={(e) => setEmail(e.target.value)}
						error={Errors.Email === true}
						helperText={Errors.Email ? 'Ingresa un correo electronico valido' : null}
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
					<PasswordField
						variant="outlined"
						margin={20}
						required
						fullWidth
						name="password"
						label="Confirmar Contraseña"
						autoComplete="current-password"
						value={PasswordConf}
						onChange={(e) => setPasswordConf(e.target.value)}
						error={Errors.PasswordConf === true || Errors.PasswordConfMatch === true}
						helperText={
							Errors.PasswordConf
								? 'Confirma tu contraseña'
								: Errors.PasswordConfMatch
								? 'Las contraseñas no coinciden'
								: null
						}
					/>
					{Errors.Auth && <ErrorMsg Title="Error de creación" Message={Errors.Auth} />}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						loading={loading}
					>
						Crear Cuenta
					</Button>
					<LoginLink />
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default SignupWrapper(Signup);
