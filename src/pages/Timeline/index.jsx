import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPosts } from '../../service/service.posts';
import Loader from 'react-loader-spinner';
import Post from '../shared/Post';
import pageReloadErrorAlert from './pageReloadErrorAlert';
import UserContext from '../../contexts/UserContext';
import Header from '../shared/Header';

export default function Timeline(){
	const [timelinePostsList, setTimelinePostsList] = useState([]);
	const [loaderIsActive, setLoaderIsActive] = useState(false);
	const {userInfo} = useContext(UserContext);

	function renderTimelinePosts(){		
		setLoaderIsActive(true);
		const config = {headers: 
			{ 'Authorization': `Bearer ${userInfo.token}` }
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
		renderTimelinePosts();
	},[userInfo]);

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
const CreateNewPostBox = styled.div`
	width: 100%;
	min-height: 209px;
	height: auto;
	background-color: #fff;
	border-radius: 16px;
	margin-bottom: 13px;
	@media (max-width: 611px) {
		border-radius: 0px;
		margin-bottom: 0px;
		min-height: 164px;
	}
`;

const HashtagContainer = styled.div`
	width: 301px; 
	height: 406px;
	background-color: #171717;
	margin-top: 160px;
	border-radius: 16px;
	@media (max-width: 1024px) {
		display: none;
	}
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