import { Todos } from '../../../../db';

export default (root, {}, { decoded }) => {
	const user = decoded.sub;
	return new Promise((resolve, reject) => {
		Todos.find({ CreatedBy: user }, (error, todos) => {
			// if error reject
			if (error) return reject(error);
			// else resolves
			return resolve(todos);
		});
	});
};
