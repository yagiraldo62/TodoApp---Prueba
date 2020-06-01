import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import GridContainer from '@material-ui/core/Container';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
`;

export default ({ children }) => (
	<Container>
		<Header />
		<GridContainer>{children}</GridContainer>
	</Container>
);
