import { client } from '../utils/helpers/apolloClient';
import { gql } from 'apollo-boost';

export const Me = () => {
	const query = gql`
		query {
			Me {
				Email
				Name
			}
		}
	`;
	return new Promise((resolve, reject) => {
		client
			.query({ query })
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};
