import { Todos as Todo } from '../../../../db';

export default (root, { todo }) => {
	const { _id } = todo;
	return new Promise((resolve, reject) => {
		Todo.findOneAndUpdate({ _id }, todo, { new: false }, async (error) => {
			if (error) return reject(error);
			const Todo_ = await Todo.findById(_id);
			resolve(Todo_);
		});
	});
};
