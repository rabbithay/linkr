import React from 'react';
import styled from 'styled-components';
export default function Timeline(){

	
	return(
		<>
			<Header/>
			<Background>
				<TimelineContent>
					<h1>timeline</h1>
					<CreateNewPostBox/>
					<PostContainer />
					<PostContainer />
					<PostContainer />
					<PostContainer />
				</TimelineContent>
				<HashtagContainer/>
			</Background>
		</>
	);
}

const Header = styled.div`
	width: 100%;
	height: 72px;
	position: fixed;
	background-color: #151515;
`;
const Background = styled.div`
	width: 100%;
	min-width: 100vw;
	height: auto;
	min-height: 100vh;
	display: inline-flex;
	background-color: #333;
	justify-content: center;
	gap: 25px;
	padding: 72px;
`;
const TimelineContent = styled.div`
	width: 611px;
	height: auto;
	h1 {
		font-family: 'Oswald';
		font-weight: 700;
		font-size: 43px;
		color: #fff;
		margin: 53px 0px 43px 0px;
		justify-content: flex-start;
		line-height: 63px;
	}
`;
const CreateNewPostBox = styled.div`
	width: 611px;
	height: 209px;
	background-color: #fff;
	border-radius: 16px;
	margin-bottom: 13px;
`;

const PostContainer = styled.div`
	width: 611px;
	height: auto;
	min-height: 270px; //provisorio p visualizar
	border-radius: 16px;
	background-color: #171717;
	margin-top: 16px;
`;

const HashtagContainer = styled.div`
	width: 301px; 
	height: 406px;
	background-color: #171717;
	margin-top: 160px;
	border-radius: 16px;
`;