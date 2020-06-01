import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from '../../config';
import { getToken } from './UserStorage';
const { gqlApiUrl } = config;

const httpLink = createHttpLink({
	uri: gqlApiUrl,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = getToken();
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			'access-token': token,
		},
	};
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		dataIdFromObject: (object) => {
			switch (object.__typename) {
				case 'User':
					return object.Email;
				default:
					return object._id;
			}
		},
	}),
});
