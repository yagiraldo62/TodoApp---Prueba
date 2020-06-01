import { Todos as Todo } from '../../../../db';
import { createdAtInfo } from '../../../../models/BuildModel';

export default (root, { todo }, { decoded }) => {
	const User = decoded.sub;
	createdAtInfo(todo, User);
	const newTodo = Todo(todo);
	return new Promise((resolve, reject) => {
		newTodo.save((err) => {
			if (err) return reject(err);
			resolve(newTodo);
		});
	});
};
