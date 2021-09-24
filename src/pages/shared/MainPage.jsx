import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../shared/Header';
import SearchBar from './SearchBarComponents';
import CirclesLoader from '../shared/CirclesLoader';
import pageReloadErrorAlert from '../shared/pageReloadErrorAlert';
import NoPostMessage from '../shared/NoPostMessage';
import Post from './PostComponents/Post';
import Trending from '../shared/Trending';

export default function MainPage(props) {

	const {
		getPosts,
		titleText,
		CreatePost,
		params={},
		updateTitle
	} = props;
	const { hashtag, someonesId } = params;

	const { userInfo: { token, userId } } = useContext(UserContext);
	
	const [postsList, setPostsList] = useState([]);
	const [loaderIsActive, setLoaderIsActive] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const history = useHistory();


	const loadPosts = () => {
		setLoaderIsActive(true);
		if (token) {
			getPosts({ token, userId, hashtag, someonesId })
				.then(({ data: { posts } }) => setPostsList(posts))
				.catch(pageReloadErrorAlert)
				.finally(() => setLoaderIsActive(false));
		}
	};

	const loadMorePosts = () => {
		let index = postsList.length - 1;
		let lastPostId = postsList[index].repostId !== undefined
			? postsList[index].repostId
			: postsList[index].id; 
		getPosts({ token, userId, hashtag, someonesId, lastPostId })
			.then((res) => {
				if (res.data.posts.length === 0) {
					setHasMore(false);
				}
				setPostsList([...postsList, ...res.data.posts]);
			}).catch(pageReloadErrorAlert);
	};

	const updatePosts = () => {
		if (!token || !postsList[0]) return;
		const firstPostId = postsList[0].repostId !== undefined ? postsList[0].repostId : postsList[0].id; 
		getPosts({token, userId, hashtag, someonesId, firstPostId})
			.then((res) => {
				setPostsList([...res.data.posts, ...postsList]);
			}).catch(pageReloadErrorAlert);
	};


	if (updateTitle) {
		if (Number(someonesId) === userId) history.push('/my-posts');
		useEffect(() => updateTitle(token, someonesId), [token]);
	}

	useEffect(()=>{
		loadPosts();
		window.scrollTo(0, 0);
		const intervalId = setInterval(() => {
			updatePosts();
		}, 15000);
		return () => clearInterval(intervalId);
	}, [token, hashtag]);

	const postListJSX = (postsList) => {
		return postsList.map((post) => {
			return (
				<Post
					key={post.repostId !== undefined ? post.repostId : post.id}
					postInfo={post}
				/>
				
			);
		});
	};
	

	if (updateTitle) {
		if (Number(someonesId) === userId) history.push('/my-posts');
		useEffect(() => updateTitle(token, someonesId), [token, someonesId]);
	}
	
	useEffect(() => {
		window.scrollTo(0, 0);
		loadPosts();
	}, [token, hashtag, someonesId]);

	return (
		<>
			<Header />
			<Background>
				<TimelineContent>
					<SearchBar />
					
					{loaderIsActive || !titleText
						? <h1>Loading...</h1>
						: <h1>{titleText}</h1>
					}

					{CreatePost
						? <CreatePost loadTimelinePosts={loadPosts}/>
						: <></>
					}

					{loaderIsActive
						? <CirclesLoader />
						: (postsList.length)
							?<InfiniteScroll
								dataLength={postsList.length}
								next={loadMorePosts}
								hasMore={hasMore}
								loader={<CirclesLoader />}
							>
								{postListJSX(postsList)}
							</InfiniteScroll>
							: <NoPostMessage />
					}					
					
				</TimelineContent>
				
				<HashtagContainer>
					{token
						? <Trending loaderIsActive={loaderIsActive} />
						:	<></>
					}
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

	> h1 {
		font-family: 'Oswald';
		font-weight: 700;
		font-size: 43px;
		color: #fff;
		margin: 53px 0px 43px 0px;
		justify-content: flex-start;
		line-height: 63px;
		word-break: break-all;

		@media (max-width: 611px) {
			margin: calc(53px + 75px) 0px 12px 17px;
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
	position: sticky;
	top: 80px;

	@media (max-width: 1024px) {
		display: none;
	}
`;
