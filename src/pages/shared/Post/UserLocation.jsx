import React from 'react';
import styled from 'styled-components';
import { CloseOutline } from 'react-ionicons';

function UserLocation({setViewUserLocation}) {
	return(
		<PreviewBackground>
			<PreviewContainer>
				<CloseOutline
					onClick={() => setViewUserLocation(false)}
					color={'#FFFFFF'} 
					height="40px"
					width="40px"
					style={{
						position: 'absolute',
						top: '10px',
						right: '15px',
						cursor: 'pointer'
					}}
				/>

			</PreviewContainer>
		</PreviewBackground>
	);
}

const PreviewBackground = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	background: #FFFFFFE5;
	padding: 4% 15%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PreviewContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #333333;
	border-radius: 30px;
	position: relative;
	`;

export default UserLocation;
