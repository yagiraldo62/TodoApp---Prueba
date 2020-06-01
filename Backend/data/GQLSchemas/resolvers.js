import Mutations from './Resolvers/Mutations/';
import Queries from './Resolvers/Queries/';
import { DateScalar } from './Scalars';
export default {
	// Date Scalar Definition
	Date: DateScalar,
	Mutation: {
		// ### Client
		CreateTodo: Mutations.Todo.Create,
		UpdateTodo: Mutations.Todo.Update,
		DeleteTodo: Mutations.Todo.Delete,
	},
	Query: {
		// ### User
		Me: Queries.User.Me,
		// ### Todo
		ReadTodos: Queries.Todo.Read,
	},
};
