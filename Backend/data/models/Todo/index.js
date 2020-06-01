import BuildModel from '../BuildModel';
import TodoModel from './model';

class Todo {}

export default (db) => BuildModel(db, 'Todos', TodoModel, Todo, { paginate: true });
