import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSomeonesPosts } from '../../service/service.posts';
import Post from '../shared/Post';
import pageReloadErrorAlert from '../shared/pageReloadErrorAlert';
import UserContext from '../../contexts/UserContext';
import Header from '../shared/Header';
import CirclesLoader from '../shared/CirclesLoader';
import HashtagTrending from '../shared/HashtagTrending';
import NoPostMessage from '../shared/NoPostMessage';
import { useParams } from 'react-router-dom';

export default function SomeonesPosts(){
	const [postsList, setPostsList] = useState([]);
	const [userName, setUserName] = useState('');
	const [loaderIsActive, setLoaderIsActive] = useState(false);
	const {userInfo} = useContext(UserContext);
	const params = useParams();
	const {id:someonesId} = params;

	function loadPosts(){		
		setLoaderIsActive(true);
		getSomeonesPosts(someonesId ,userInfo.token).then((res)=>{
			setUserName(res.data.posts[0].user.username);
			setPostsList(res.data.posts);
		}).catch(()=>{
			
			pageReloadErrorAlert();
		}).finally(()=>{
			setLoaderIsActive(false);
		});
	}
	
	useEffect(()=>{		
		loadPosts();
	},[userInfo]);

	return(
		<>	
			<Header/>
			<Background>
				<TimelineContent>
					<h1>{`${userName}'s`}</h1>
					{loaderIsActive 
						? <CirclesLoader/>
						: (postsList.length)
							?  postsList.map((p)=>{
								return (
									<Post key={p.id} postInfo={p} />
								);
							})
							: <NoPostMessage/>
					}
				</TimelineContent>
				<HashtagContainer>
					<HashtagTrending/>
				</HashtagContainer>
			</Background>
		</>
	);
}

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
