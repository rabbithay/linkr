import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RepeatOutline, Location } from 'react-ionicons';
import UserContext from '../../../contexts/UserContext';
import Like from './Like';
import SharePost from './SharePost';
import { editPost, deletePostAPI } from '../../../service/service.posts';
import ModalAlert from '../ModalAlert';
import CirclesLoader from '../CirclesLoader';
import WrapperDeleteAndEdit, {InsertEditInput} from './DeleteAndEdit';
import Comments from './Comments';
import CommentIcon from './CommentIcon';
import LinkPreview from './LinkPreview';
import UserLocation from './UserLocation';
import LinkContainer from './LinkContainer';

export default function Post({ postInfo }) {
	const { userInfo } = useContext(UserContext);
	const { userId, token } = userInfo;
	const {
		text,
		link,
		user,
		id: postId,
		likes,
		repostCount,
		repostedBy,
		commentCount,
		geolocation
	} = postInfo;
	const { avatar, username, id } = user;

	const [edit, setEdit] = useState(false);
	const [postText, setPostText] = useState(text);
	const [editPostText, setEditPostText] = useState(postText);
	const [postDeleted, setPostDeleted] = useState(false);
	const [readPreview, setReadPreview] = useState(false);
	const [viewUserLocation, setViewUserLocation] = useState(false);
	const [loading, setLoading] = useState(false);
	const editRef = useRef();
	const [commentsTabIsOpen, setCommentsTabIsOpen] = useState(false);
	
	function hashtag(text){
		const repl = text.replace(/#(\w+)/g, '<a href="/hashtag/$1">#$1</a>');
		return repl;
	}
	
	const handleEditMode = (key) => {
		if (key === 'Escape') {
			setEdit(false);
		}
		else if (key === 'Enter') {
			setLoading(true);
			editPost(token, postText, postId)
				.then(() => {
					setLoading(false);
					setEdit(false);
					setPostText(editPostText);
				})
				.catch(() => {
					const modalObj = {
						icon: 'error',
						title: 'An error occurred on editing this post, please, try again later'
					};
					ModalAlert(modalObj);
				});
		}
	};

	const deletePost = () => {
		const sendDeleteToAPI = () => {
			setLoading(true);
			deletePostAPI(postId, token)
				.then(() => {
					setLoading(false);
					setPostDeleted(true);
				})
				.catch(() => {
					const modalObj = {
						icon: 'error',
						title: 'An error occurred on deleting this post'
					};
					ModalAlert(modalObj);
					setLoading(false);
				});

		};
		//create delete pop-up
		const modalObj = {
			title: 'Are you sure you want to delete this post?',
			buttonOptions: true,
			functionOnConfirm: sendDeleteToAPI
		};
		ModalAlert(modalObj);
	};

	return (
		<>
			<PostContainer postDeleted={postDeleted ? 1 : 0} postReposted={repostedBy !== undefined}>
				{repostedBy ?
					<RepostInfo user={repostedBy.id === userId ? 'you' : repostedBy.username}/>
					:
					''}
				<Link to={`/user/${user.id}`}><UserIcon alt='avatar' src={avatar} /></Link>
				{ loading ?
					<Loading>
						<CirclesLoader />
					</Loading>
					:
					<PostContent>
						{userId === id ?
							<WrapperDeleteAndEdit
								edit={edit}
								setEdit={setEdit}
								setPostText={setPostText}
								text={text}
								deletePost={deletePost}
							/>
							:
							''
						}

						<Wrapper>
							<Link to={`/user/${user.id}`}><h3>{username}</h3></Link>
							{geolocation !== undefined ?
								<Location
									onClick={() => setViewUserLocation(true)}
									color='#FFFFFF'
									height="20px"
									width="20px"
									style={{
										cursor: 'pointer',
										marginLeft: '10px'
									}}
								/>
								: 
								''
							}
						</Wrapper>

						{edit ?
							<InsertEditInput
								editPostText={editPostText}
								setEditPostText={setEditPostText}
								editRef={editRef}
								handleEditMode={handleEditMode}
								loading={loading ? 1 : 0}
							/>
							:
							<div dangerouslySetInnerHTML={{ __html: `<p >${hashtag(postText)}</p>` }} />
						}
						{readPreview ? <LinkPreview setReadPreview={setReadPreview} link={link}/> : ''}
						{viewUserLocation ? 
							<UserLocation 
								setViewUserLocation={setViewUserLocation} 
								username={username} 
								coord={geolocation}
							/>
							: 
							''}
						<a style={{cursor: 'pointer'}}>
							<LinkContainer onClick={() => setReadPreview(true)} postInfo={postInfo}/>
						</a>
					</PostContent>
				}
				<ActionsHolder>
					<Like likes={likes} id={postId} userInfo={userInfo} />
					<CommentIcon onClick={()=>setCommentsTabIsOpen(!commentsTabIsOpen)} commentCount={commentCount} />
					<SharePost shareCount={repostCount} postId={postId} token={token} repostedBy={repostedBy} userId={userId} />
				</ActionsHolder>
			</PostContainer>
			{commentsTabIsOpen ? 
				<Comments 
					userInfo={userInfo} 
					postUserId={id} 
					token={token} 
					postId={postId}
					setCommentsTabIsOpen={setCommentsTabIsOpen}
				/> : ''}
		</>
	);
}

function RepostInfo({user}) {
	return (
		<RepostDiv >
			<RepeatOutline
				color={'#ffffff'} 
				height="20px"
				width="20px"
				style={{
					marginRight: '10px'
				}}
			/>
			Re-posted by <span>{user}</span>
		</RepostDiv>
	);
}
const PostContainer = styled.div`
	width: 611px;
	height: auto;
	border-radius: 16px;
	background-color: #171717;
	margin-top: ${props => props.postReposted? '36px':'16px'};
	padding: 17px 21px 20px 18px;
	display: ${props => props.postDeleted? 'none':'inline-flex'};
	gap: 18px;
	position: relative;
	@media (max-width: 611px) {
		width: 100vw;
		border-radius: 0px;
		padding: 10px 18px 15px 15px;		
    }
	position: relative;
`;

const UserIcon = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 20px;
	@media (max-width: 611px) {
		width: 40px;
		height: 40px;
	}
`;

const PostContent = styled.div `
	font-family: 'Lato';
	width: 513px;
	min-height: 219px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	h3{
		color: #fff;
		font-size: 19px;
		line-height: 23px;
		margin-bottom: 7px;
		word-break: break-word;
		@media (max-width: 611px) {
			font-size: 17px;
			line-height: 20px;
		}
	}
	p {
		color: #b7b7b7;
		font-size: 17px;
		line-height: 20px;
		margin-bottom: 14px;
		word-break: break-word;
		@media (max-width: 611px) {
			font-size: 15px;
			line-height: 18px;
		}
	}
	a {
		color: #fff;
		font-weight: bold;
	}
	@media (max-width: 611px) {
		min-height: 174px;
	}
`;

const Loading = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	padding-bottom: 10px;
`;

const ActionsHolder = styled.div`
  	width: 70px;
	height: calc(100% - 86px);
	padding-bottom: 20px;
	max-height: 160px;
	position: absolute;
	top: 86px;
	left: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: 611px) {
		top: 60px;
		left: 0;
		height: calc(100% - 60px);
		padding-bottom: 15px;
	}
`;

const RepostDiv = styled.div`
	height: 33px;
	width: 100%;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
	position: absolute;
	top: -20px;
	left: 0;
	color: white;
	font-family: 'Lato';
	background-color: #1E1E1E;
	display: flex;
	align-items: center;
	padding-left: 10px;
	overflow: hidden;
	white-space: nowrap;
	&& span {
		margin-left: 4px;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (max-width: 611px) {
		top: -30px;
	}
`;

const Wrapper = styled.div`
	display: flex;

	&& h3 {
		max-width: 420px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;
