import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PaperPlaneOutline } from 'react-ionicons';
import { getComments, postComment } from '../../../service/service.posts';
import Comment from './CommentBox';
import { CommentBox, UserIcon } from './CommentBox';

export default function Comments({token, postId, userInfo, postUserId}){
	const [text, setText] = useState('');
	const [commentsList, setCommentsList] = useState([]);    

	useEffect(()=>{
		if (token){
			getComments(token, postId).then((res)=>{
				setCommentsList(res.data.comments);
			}).catch();
		}
	},[commentsList, token]);


	function newComment(){
		if (token){
			postComment(token, postId, text).then(()=>{
				setText('');
			}).catch();
		}
	}
    
	return(
		<CommentsContainer>
			{(commentsList.length) ? commentsList.map((comment)=>{
				return (
					<Comment 
						key={comment.id} 
						comment={comment} 
						postUserId={postUserId} 
					/>
				); 
			}): ''}			
			<CommentBox>
				<UserIcon src={userInfo.userImg} />
				<CommentInput 
					placeholder="write a comment..." 
					type='text'
					onChange={(e)=>setText(e.target.value)}
					value={text}
				/>
				<SendComment onClick={newComment} >
					<PaperPlaneOutline
						color={'#fff'} 
						height="17px"
						width="17px"
					/>
				</SendComment>
			</CommentBox>
		</CommentsContainer>
	);
}

const CommentsContainer = styled.div`
    background-color: #1E1E1E;
    padding: 16px 23px 4px 20px;
    z-index: 0;
    border-radius: 0px 0px 16px 16px;
    font-family: 'Lato';
    height: auto;
    min-height: 83px;
    margin-top: -16px;
`;

const CommentInput = styled.input`
    width: 510px;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    margin-top: 4px;
    border: none;
    line-height: 17px;
    padding: 11px 15px;
    color: #ACACAC;
    letter-spacing: 0.05em;
    ::placeholder {
        font-style: italic;
        font-weight: normal;
        font-size: 14px;
    }
    @media (max-width: 600px) {
        width: calc(100% + 20px);
	}
`;

const SendComment = styled.button`
    z-index: 1;
    position: absolute;
    right: 10px;
    top: 30px;
    background-color: transparent;
    cursor: pointer;

`;
