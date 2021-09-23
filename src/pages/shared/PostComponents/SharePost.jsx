import React, { useState } from 'react';
import styled from 'styled-components';
import { RepeatOutline } from 'react-ionicons';
import { sharePost } from '../../../service/service.posts';
import ModalAlert from '../ModalAlert';

export default function SharePost({ shareCount, token, postId }) {
	const [shared, setShared] = useState(shareCount);

	const rePost = () => {
		const sendRequestToAPI = () => {
			setShared(shared + 1);
			sharePost(token, postId);
		};

		const modalObj = 
		{
			title: 'Do you want to re-post this link?',
			buttonOptions: true,
			functionOnConfirm: sendRequestToAPI,
			share: true
		};
		ModalAlert(modalObj);
	};

	return (
		<ShareContainer onClick={rePost}>
			<RepeatOutline
				color={'#ffffff'} 
				height="20px"
				width="20px"
			/>
			<ShareQty>{`${shared} re-post${shared > 1 ? 's' : ''}`}</ShareQty>
		</ShareContainer>
	);
}
		

const ShareContainer = styled.div`
	font-family: "Lato";
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	@media (max-width: 600px) {
		left: 12px;
		top: 60px;
	}

`;
const ShareQty = styled.p`
	color: #fff;
	margin-top: 3px;
	font-size: 14px;
`;
