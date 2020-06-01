import mongoose from 'mongoose';

// DB Models
import DBModels from './models/';

import { MongoUrl } from '../config';

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);

(async () => {
	try {
		await mongoose.connect(MongoUrl, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.log('Error', err.message);
	}
})();

const { User, Todo } = DBModels;

const Users = User(mongoose);
const Todos = Todo(mongoose);

export { Users, Todos };
