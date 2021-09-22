import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RepeatOutline } from 'react-ionicons';
import UserContext from '../../../contexts/UserContext';
import Like from './Like';
import SharePost from './SharePost';
import { editPost, deletePostAPI } from '../../../service/service.posts';
import ModalAlert from '../ModalAlert';
import CirclesLoader from '../CirclesLoader';
import WrapperDeleteAndEdit, {InsertEditInput} from './DeleteAndEdit';

export default function Post({ postInfo }) {
	const { userInfo } = useContext(UserContext);
	const { userId, token } = userInfo;
	const {
		text,
		link,
		user,
		linkImage,
		linkTitle,
		linkDescription,
		id: postId,
		likes,
		repostCount,
		repostedBy
	} = postInfo;
	const { avatar, username, id } = user;

	const [edit, setEdit] = useState(false);
	const [postText, setPostText] = useState(text);
	const [editPostText, setEditPostText] = useState(postText);
	const [postDeleted, setPostDeleted] = useState(false);
	const [loading, setLoading] = useState(false);
	const editRef = useRef();
	
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

					<Link to={`/user/${user.id}`}><h3>{username}</h3></Link>

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
					<a href={link} target="_blank" rel="noreferrer" >
						<LinkContainer >
							<LinkPreviewTexts
								isLongDescription={linkDescription ? linkDescription.length > 100 : false}
							>
								<h4>{linkTitle}</h4>
								<p>{linkDescription}</p>
								<a href={link} target="_blank" rel="noreferrer" >{link}</a>
							</LinkPreviewTexts>
							<LinkPreviewImage alt="link preview image" src={linkImage} />
						</LinkContainer>
					</a>
				</PostContent>
			}
			<ActionsHolder>
				<Like likes={likes} id={postId} userInfo={userInfo} />
				<SharePost shareCount={repostCount} postId={postId} token={token} repostedBy={repostedBy} userId={userId}/>
			</ActionsHolder>
		</PostContainer>
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

const LinkContainer = styled.div `
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
	p {
		font-size: 11px;
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

	&& span {
		margin-left: 4px;
		font-weight: 700;
	}

	@media (max-width: 611px) {
		top: -30px;
	}
`;