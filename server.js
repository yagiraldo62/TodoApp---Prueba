import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import busboy from 'connect-busboy';
import busboyBodyParser from 'busboy-body-parser';
import Auth from './Backend/data/routes/Auth';
import graphqlHTTP from 'express-graphql';
import schema from './Backend/data/GQLSchemas';

// middleware to verify user token
import RequiredAuth from './Backend/middleware/RequiredAuth';

// Server port
const port = process.env.PORT || 8000;
const app = express();

// set cors configuration
app.use(cors());

// Parse application/xwww-
// form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Convert Response to Json
app.use(bodyParser.json());

// Parse request files
app.use(busboy());
app.use(busboyBodyParser());

// Authentication
app.use('/api/auth', Auth);
// Graphql service
app.use(
	'/api/gql',
	RequiredAuth,
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

// firts route
app.get('*', (req, res) => {
	res.send('Todo App Service');
});

// Run server
app.listen(port, () => console.log('Server Ready'));
