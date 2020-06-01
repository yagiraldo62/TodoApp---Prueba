import React from 'react';
import { Location, Router } from '@reach/router';
import posed, { PoseGroup } from 'react-pose';

const RouteContainer = posed.div({
	enter: { delay: 400, beforeChildren: 450 },
});

export default ({ children }) => {
	return (
		<Location>
			{({ location }) => (
				<PoseGroup>
					<RouteContainer key={location.key}>
						<Router location={location}>{children}</Router>
					</RouteContainer>
				</PoseGroup>
			)}
		</Location>
	);
};
