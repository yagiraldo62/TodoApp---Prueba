import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { key } from '../config';

const RequiredAuth = Router();

RequiredAuth.use((req, res, next) => {
	// get JWT
	const token = req.headers['access-token'];

	// verify token
	if (token) {
		// token exists
		jwt.verify(token, key, (err, decoded) => {
			if (err) {
				// token is invalid
				console.log(err);
				return res.json({ message: err });
			} else {
				// token is valid and will be sent in the request
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// token does not exist, send error
		res.json({
			message: 'Unprovided Token',
		});
	}
});

export default RequiredAuth;
