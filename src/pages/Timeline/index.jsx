import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Post from './Post';
import pageReloadErrorAlert from './pageReloadErrorAlert';

export default function Timeline(){
	const [timelinePostsList, setTimelinePostsList] = useState([]);
	const [loaderIsActive, setLoaderIsActive] = useState(false);

	function renderTimelinePosts(){
		setLoaderIsActive(true);
		const config = {headers: 
			{ 'Authorization': 'Bearer ecb85fd8-5b84-453c-b6d8-0c83c3d463a8' }
		};
		axios.get(
			'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', 
			config
		).then((res)=>{
			setTimelinePostsList(res.data.posts);
		}).catch(()=>{
			pageReloadErrorAlert();
		}).finally(()=>{
			setLoaderIsActive(false);
		});
	}
	useEffect(()=>{		
		renderTimelinePosts();
	},[]);

	return(
		<>	
			<Header/>
			<Background>
				<TimelineContent>
					<h1>timeline</h1>
					<CreateNewPostBox/>
					{loaderIsActive 
						? <DisplayFlexCenter>						
							<Loader type="Circles" color="#b7b7b7" height={100} width={100} />
						</DisplayFlexCenter>
						: (timelinePostsList.length)
							?  timelinePostsList.map((p)=>{
								return (
									<Post key={p.id} postInfo={p} />
								);
							})
							: <DisplayFlexCenter>
								<NoPostMessage>No posts were found :(</NoPostMessage>
							</DisplayFlexCenter>
					} 					
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

const HashtagContainer = styled.div`
	width: 301px; 
	height: 406px;
	background-color: #171717;
	margin-top: 160px;
	border-radius: 16px;
`;

const DisplayFlexCenter = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 40px;
`;

const NoPostMessage = styled.p`
	font-weight: bold;
	font-size: 20px;
	color: #b7b7b7;
	font-family: 'Lato';
`;