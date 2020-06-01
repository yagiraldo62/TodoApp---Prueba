import { Router } from 'express';
import { Errors, generateToken } from './AuthFunctions';
import { Login, Register, Me } from '../../modules/Authentication';
import RequiredAuth from '../../../middleware/RequiredAuth';
import jwt from 'jsonwebtoken';

const router = Router();

// Login
router.post('/login', async function (req, res) {
	const { Email, Password } = req.body;

	// Validate fields
	const errors = Errors({ Email, Password });
	if (errors) return res.status(403).json(errors);

	// Validate user credentials
	const User = await Login({ Email, Password });

	if (User === null) return res.status(403).json({ message: 'Authentication Failed' });

	const token = generateToken(User.id);
	res.status(203).json({
		message: 'Correct Authentication',
		token: token,
	});
});

// Login
router.post('/register', async function (req, res) {
	const { Name, Email, Password, ConfPassword } = req.body;
	// Validate fields
	const errors = Errors({ Name, Email, Password, ConfPassword }, false);
	if (errors) return res.status(403).json(errors);

	// Register user
	Register({ Name, Email, Password })
		.then((User) => {
			const token = generateToken(User.id);

			res.status(203).json({
				message: 'Correct Registration and Authentication',
				token: token,
			});
		})
		.catch((err) => {
			res.status(403).json(err);
		});
});

// Returns user info
router.get('/me', RequiredAuth, async function (req, res) {
	const User = req.decoded.sub;
	const { Email, Name } = await Me(User);
	res.json({ Email, Name });
});

export default router;
