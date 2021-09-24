import React from 'react';
import styled from 'styled-components';
import { CloseOutline } from 'react-ionicons';

function LinkPreview({ setReadPreview, link }) {
	return(
		<PreviewBackground>
			<PreviewContainer>
				<OpenNewTab href={link} target="_blank" rel="noreferrer" >
					Open in new tab
				</OpenNewTab>
				<CloseOutline
					onClick={() => setReadPreview(false)}
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
				<Preview src={link}></Preview>
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

	@media (max-width: 600px) {
		padding: 5%;
	}
`;

const PreviewContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #333333;
	border-radius: 30px;
	position: relative;
	`;

const OpenNewTab = styled.a`
	width: 140px;
	height: 35px;
	background-color: #1877F2;
	color: #FFFFFF;
	position: absolute;
	top: 15px;
	left: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	font-family: 'Lato';
	font-weight: 700;
	font-size: 15px;
	cursor: pointer;
`;

const Preview = styled.iframe`
	width: 95%;
	height: calc(100% - 90px);
	position: absolute;
	bottom: 3%;
	left: 2.5%;
	border-radius: 10px;
`;


export default LinkPreview;
