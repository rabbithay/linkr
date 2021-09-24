import React from 'react';
import styled from 'styled-components';

export default function FollowingNoOneMessage(){
	return (
		<DisplayFlexCenter>
			<Message>You don&apos;t follow anyone yet, look for profiles in search :)</Message>
		</DisplayFlexCenter>
	);
}

const DisplayFlexCenter = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 40px;
`;
const Message = styled.p`
	font-weight: bold;
	font-size: 20px;
	color: #b7b7b7;
	font-family: 'Lato';
`;