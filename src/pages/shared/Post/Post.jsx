import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deletePostAPI } from '../../../service/service.posts';
import UserContext from '../../../contexts/UserContext';
import Like from '../Like';
import { editPost } from '../../../service/service.posts';
import ModalAlert from '../ModalAlert';
import CirclesLoader from '../CirclesLoader';
import WrapperDeleteAndEdit from './DeleteAndEdit';
import {InsertEditInput} from './DeleteAndEdit';
import LinkPreview from './LinkPreview';

export default function Post({postInfo}){
	const { text, link, user, linkImage, linkTitle, linkDescription, likes } = postInfo;
	const { avatar, username, id } = user;
	const {userInfo} = useContext(UserContext);
	const {userId, token} = userInfo;
	const postId = postInfo.id;
	const [edit, setEdit] = useState(false);
	const [postText, setPostText] = useState(text);
	const [editPostText, setEditPostText] = useState(postText);
	const [postDeleted, setPostDeleted] = useState(false);
	const [readPreview, setReadPreview] = useState(false);
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
					const modalObj = 
					{
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
				.then(()=>{
					setLoading(false);
					setPostDeleted(true);
				})
				.catch(()=>{
					const modalObj = 
					{
						icon: 'error',
						title: 'Oops...',
						description: 'Ocorreu um erro ao deletar publicação'
					};
					ModalAlert(modalObj);
					setLoading(false);
				});

		};
		//create delete pop-up
		const modalObj =
		{
			title: 'Tem certeza que deseja excluir essa publicação?',
			buttonOptions: true,
			functionOnConfirm: sendDeleteToAPI
		};
		ModalAlert(modalObj);
	};
	
	return (
		<PostContainer postDeleted={postDeleted ? 1 : 0}>
			<Link to={`/user/${user.id}`}><UserIcon alt='avatar' src={avatar} /></Link>
			{
				loading ?
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
						{readPreview ? <LinkPreview setReadPreview={setReadPreview} link={link}/> : ''}
						<a style={{cursor: 'pointer'}}>
							<LinkContainer onClick={() => setReadPreview(true)}>
								<LinkPreviewTexts
									isLongDescription={linkDescription ? linkDescription.length > 120 : false}
								>
									<h4>{linkTitle}</h4>
									<p>{linkDescription}</p>
									<p>{link}</p>
								</LinkPreviewTexts>
								<LinkPreviewImage alt="link preview image" src={linkImage} />
							</LinkContainer>
						</a>
					</PostContent>
			}
			<Like  likes={likes} id={postId} userInfo={userInfo} />

		</PostContainer>
	);
}



const PostContainer = styled.div`
	width: 611px;
	height: auto;
	border-radius: 16px;
	background-color: #171717;
	margin-top: 16px;
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
	h3{
		color: #fff;
		font-size: 19px;
		line-height: 23px;
		margin-bottom: 7px;
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