import { gql } from 'apollo-boost';
export const CreateTodo = gql`
	mutation CreateTodo($todo: TodoInput) {
		CreateTodo(todo: $todo) {
			_id
			Name
			Description
			DueDate
			Priority
			Completed
			CreatedAt
		}
	}
`;

export const UpdateTodo = gql`
	mutation UpdateTodo($todo: TodoInput) {
		UpdateTodo(todo: $todo) {
			_id
			Name
			Description
			DueDate
			Priority
			Completed
			CreatedAt
		}
	}
`;

export const DeleteTodo = gql`
	mutation DeleteTodo($todo: ID) {
		DeleteTodo(todo: $todo)
	}
`;

export const ReadTodos = gql`
	{
		ReadTodos {
			_id
			Name
			Description
			DueDate
			Priority
			Completed
			CreatedAt
		}
	}
`;
