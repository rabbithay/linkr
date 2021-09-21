import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import { getPosts } from '../../service/service.posts';

import Header from '../shared/Header';
import CirclesLoader from '../shared/CirclesLoader';
import pageReloadErrorAlert from '../shared/pageReloadErrorAlert';
import NoPostMessage from '../shared/NoPostMessage';
import CreatePost from './CreatePost';
import Post from '../shared/Post';
import Trending from '../shared/Trending';

export default function Timeline(){
	const [timelinePostsList, setTimelinePostsList] = useState([]);
	const [loaderIsActive, setLoaderIsActive] = useState(false);
	const { userInfo: { token } } = useContext(UserContext);

	function loadTimelinePosts(){		
		setLoaderIsActive(true);
		const config = {headers: 
			{ 'Authorization': `Bearer ${token}` }
		};
		getPosts(config).then((res)=>{
			setTimelinePostsList(res.data.posts);
		}).catch(()=>{
			pageReloadErrorAlert();
		}).finally(()=>{
			setLoaderIsActive(false);
		});
	}
	
	useEffect(()=>{		
		loadTimelinePosts();
	},[token]);

	return(
		<>	
			<Header/>
			<Background>
				<TimelineContent>
					<h1>timeline</h1>
					<CreatePost loadTimelinePosts={loadTimelinePosts}/>
					{loaderIsActive 
						? <CirclesLoader/>
						: (timelinePostsList.length)
							?  timelinePostsList.map((p, index)=>{
								return (
									<Post key={index} postInfo={p} />
								);
							})
							: <NoPostMessage/>
					}
				</TimelineContent>
				<HashtagContainer>
					<Trending/>
				</HashtagContainer>
			</Background>
		</>
	);
}

const Background = styled.div`
	width: 100%;
	height: auto;
	min-height: 100vh;
	display: inline-flex;
	background-color: #333;
	justify-content: center;
	gap: 25px;
	padding: 72px;
	@media (max-width: 611px) {
		padding: 19px 0px;
    }
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
		@media (max-width: 611px) {
			margin: 53px 0px 12px 17px;
			font-size: 33px;
			line-height: 49px;
		}
	}
	@media (max-width: 611px) {
		width: 100vw;    
	}
`;


const HashtagContainer = styled.div`
	width: 301px; 
	height: 406px;
	background-color: #333;
	margin-top: 160px;
	border-radius: 16px;
	@media (max-width: 1024px) {
		display: none;
	}
	position: sticky;
	top: 80px;
`;
