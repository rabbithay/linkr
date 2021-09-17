import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Pencil, TrashOutline } from 'react-ionicons';

import UserContext from '../../contexts/UserContext';
// import Swal from 'sweetalert2';
// import { editPost } from '../../service/service.posts';

export default function Post({postInfo}){
	const {userInfo} = useContext(UserContext);
	const {userId} = userInfo;
	const { text, link, user, linkImage, linkTitle, linkDescription } = postInfo;
	const { avatar, username, id } = user;
	const [edit, setEdit] = useState(false);
	const [editValue, setEditValue] = useState(text);
	const editRef = useRef();

	function hashtag(text){
		const repl = text.replace(/#(\w+)/g, '<a href="/hashtag/$1">#$1</a>');
		return repl;
	}

	const handleEditMode = (keyboard) => {
		console.log(keyboard);
		if (editRef.current !== null) { 
			editRef.current.focus();
			if (keyboard.key === 'Escape') {
				setEdit(false);
				setEditValue(text);
			}
			else if (keyboard.key === 'Enter') {
				alert('teste');
				document.removeEventListener('keyup',(e) => handleEditMode(e));
			}
		}
	};
	
	return (
		<PostContainer>
			<Link to={`/user/${user.id}`}><UserIcon alt='avatar' src={avatar} /></Link>

			<PostContent>
				{userId !== id ? 
					<WrapperDeleteAndEdit 
						edit={edit}
						setEdit={setEdit}
						handleEditMode={handleEditMode}
					/> 
					: 
					''
				}

				<Link to={`/user/${user.id}`}><h3>{username}</h3></Link>	

				{edit ? 
					<InputEdit 
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						ref={editRef}
					/> 					
					:
					<div dangerouslySetInnerHTML={{ __html: `<p >${hashtag(text)}</p>` }} />
				}
				<a href={link} target="_blank" rel="noreferrer" >
					<LinkContainer >
						<LinkPreviewTexts>
							<h4>{linkTitle}</h4>						
							<p>{linkDescription}</p>
							<a href={link} target="_blank" rel="noreferrer" >{link}</a>
						</LinkPreviewTexts>
						<LinkPreviewImage alt="link preview image" src={linkImage} />
					</LinkContainer>
				</a>
			</PostContent>
		</PostContainer>
	);
}

function WrapperDeleteAndEdit({edit, setEdit, handleEditMode}) {
	return (
		<WrapperOptions>
			<Pencil 
				onClick={() => {
					edit ? setEdit(false) : setEdit(true);
					document.addEventListener('keyup', handleEditMode);
				}}
				color={'#ffffff'} 
				height="20px"
				width="20px"
				style={{
					cursor: 'pointer'
				}}
			/>
			<TrashOutline
				color={'#ffffff'} 
				height="20px"
				width="20px"
				style={{
					cursor: 'pointer'
				}}
			/>
		</WrapperOptions>
	);
}


const PostContainer = styled.div`
	width: 611px;
	height: auto;
	border-radius: 16px;
	background-color: #171717;
	margin-top: 16px;
	padding: 17px 21px 20px 18px;
	display: inline-flex;
	gap: 18px;
	position: relative;
	@media (max-width: 611px) {
		width: 100vw;
		border-radius: 0px;
		padding: 10px 18px 15px 15px;		
    }
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

const WrapperOptions = styled.div`
	width: 60px;
	height: 20px;
	display: flex;
	justify-content: space-around;
	position: absolute;
	top: 18px;
	right: 15px;
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
	h4{
		font-size: 16px;
		color: #CECECE;
		line-height: 19px;
		@media (max-width: 611px) {
			font-size: 11px;
			line-height: 13px;
    	}
	}			
	p{
		font-size: 11px;
		color: #9B9595;
		line-height: 13px;
		max-height: 40px;
		@media (max-width: 611px) {
			font-size: 9px;
			line-height: 11px;
    	}
	}
	a{
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

const InputEdit = styled.input`
	width: 100%;
	background: #FFFFFF;
	color: #4C4C4C;
	word-break: break-all;
	resize: none;
	padding: 8px;
	min-height: 40px;
	max-height: 300px;
	margin-bottom: 14px;
	border-radius: 7px;
	font-family: 'Lato';
	font-size: 14px;
	line-height: 17px;

	:focus {
		outline: none;
	}

	@media (max-width: 611px) {
		font-size: 11px;
		line-height: 13px;
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
