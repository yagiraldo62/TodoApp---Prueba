import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/sass/app.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './utils/helpers/apolloClient';
// import { theme } from './layouts/Theme';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<App />
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
