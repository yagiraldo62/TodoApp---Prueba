import { Todos as Todo } from '../../../../db';

export default (root, { todo }) => {
	const _id = todo;
	return new Promise((resolve, reject) => {
		Todo.findByIdAndRemove(_id, (error, todo) => {
			if (error) return reject(error);
			resolve(true);
		});
	});
};
