import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

export default function LinkContainer ({onClick, postInfo}) {
	const {linkImage,
		linkTitle,
		linkDescription,
		link} = postInfo;
	return	(
		<>
			{ReactPlayer.canPlay(link)  
				? <>
					<Video>
						<ReactPlayer url={link} 
							width='100%'
							height='100%'
							controls="true"
							position="absolute"
							top="0px"
							right="0px"
						/> 
					</Video>
				
					<VideoLink>{link}</VideoLink>
				</>
				: <Container onClick={onClick} >
					<LinkPreviewTexts
						isLongDescription={linkDescription ? linkDescription.length > 120 : false}
					>
						<h4>{linkTitle}</h4>
						<p>{linkDescription}</p>
						<a>{link}</a>
					</LinkPreviewTexts>
					<LinkPreviewImage alt="link preview image" src={linkImage} />
				</Container>
			}			
		</>	
	);
}

const Video = styled.div `
	width: 501px;
	height: 281px;
	position: relative;
	@media (max-width: 611px) {
		width: 100%;
		height: auto;
	}
`;
const VideoLink = styled.h6 `
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	font-family: 'Lato';
	margin-top: 10px;
	font-weight: normal;
	font-size: 17px;
	line-height: 20px;
	color: #B7B7B7;
	max-width: 90%;
	@media (max-width: 611px) {
		font-size: 14px;
	}
`;

const Container = styled.div `
	width: 503px;
	height: 155px;
	border: 1px solid #4D4D4D;
	border-radius: 11px;
	display: flex;
	@media (max-width: 611px) {
		width: calc(100vw - 87px);
		height: 115px;
  }	
`;

const LinkPreviewTexts = styled.div `
	padding: 24px 24px 23px 19px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 350px;
	h4 {
		font-size: 16px;
		color: #CECECE;
		line-height: 19px;
		word-break: break-word;
		text-overflow: ellipsis;
		overflow: hidden;
		display: ${(p) => p.isLongDescription ? '-webkit-box' : 'flex'};
		-webkit-line-clamp: 2; /* number of lines to show */
  		-webkit-box-orient: vertical;
		@media (max-width: 611px) {
			font-size: 11px;
			line-height: 13px;
    	}
	}			
	p {font-size: 11px;
		color: #9B9595;
		line-height: 13px;
		max-height: 40px;
		word-break: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		@media (max-width: 611px) {
			font-size: 9px;
			line-height: 11px;
    	}
	}
	a {
		font-size: 11px;
		color: #CECECE;
		line-height: 13px;		
		width: 300px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		@media (max-width: 611px) {
			font-size: 9px;
			line-height: 11px;
			width: 100%;			
    }
	}
	@media (max-width: 611px) {
		width: 72%;
		padding: 7px 7px 8px 11px;
  }
`;

const LinkPreviewImage = styled.img `
	width: 155px;
	height: 100%;
	border: 1px solid #4D4D4D;
	border-radius: 0px 12px 13px 0px;
	@media (max-width: 611px) {
		width: 28%;
  }
	display: flex;
	justify-content: center;
	align-items: center;
`; 