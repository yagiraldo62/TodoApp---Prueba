import styled from 'styled-components';
import { Centered } from '../components/common/Flex';

let Message = styled.div`
	width: 100vw;
	height: 100vh;
	color: #ccc;
	background: #f2f2f2;
	font-size: 2.5em;
`;

Message = Centered(Message);

export default Message;
