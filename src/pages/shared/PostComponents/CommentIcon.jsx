import React from 'react';
import styled from 'styled-components';
import { ChatbubbleEllipsesOutline } from 'react-ionicons';

export default function CommentIcon ({onClick}) {
	return (
		<ChatIconContainer onClick={onClick}>
			<ChatbubbleEllipsesOutline
				color={'#fff'}
				height="20px"
				width="20px"
				display= 'flex'
				flex-direction= 'column'
				align-items= 'center'
				cursor= 'pointer'
			/>
			<p>3 comments</p>
		</ChatIconContainer>		
	);
}
const ChatIconContainer = styled.div`
	font-family: "Lato";
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	@media (max-width: 600px) {
		left: 12px;
		top: 60px;
	}
    p{
        font-weight: normal;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
    }
`;