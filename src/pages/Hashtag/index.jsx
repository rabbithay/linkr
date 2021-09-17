import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getHashtagPosts } from '../../service/service.hashtag';
import Post from '../shared/Post';
import pageReloadErrorAlert from '../shared/pageReloadErrorAlert';
import UserContext from '../../contexts/UserContext';
import Header from '../shared/Header';
import CirclesLoader from '../shared/CirclesLoader';
import Trending from '../shared/Trending';
import NoPostMessage from '../shared/NoPostMessage';

export default function Hashtag(){
	const [hashtagPostsList, setHashtagPostsList] = useState([]);
	const [loaderIsActive, setLoaderIsActive] = useState(false);
	const { userInfo } = useContext(UserContext);
	const { hashtag } = useParams();

	function loadHashtagPosts(){		
		setLoaderIsActive(true);
		getHashtagPosts(userInfo.token, hashtag).then(({ data: { posts } })=>{
			setHashtagPostsList(posts);
		}).catch(()=>{
			pageReloadErrorAlert();
		}).finally(()=>{
			setLoaderIsActive(false);
		});
	}
	
	useEffect(()=>{
		if (userInfo.token) loadHashtagPosts();
	},[userInfo.token, hashtag]);

	return(
		<>	
			<Header/>
			<Background>
				<TimelineContent>
					<h1># {hashtag}</h1>
					{/* TODO: Seria bacana colocar o nome dessa função para somente um loadPosts */}
					{loaderIsActive 
						? <CirclesLoader/>
						: (hashtagPostsList.length)
							?  hashtagPostsList.map((p)=>{
								return (
									<Post key={p.id} postInfo={p} />
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
	min-width: 100%;
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
		word-break: break-all;
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

