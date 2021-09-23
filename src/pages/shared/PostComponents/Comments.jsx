import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PaperPlaneOutline } from 'react-ionicons';
import { getComments, postComment } from '../../../service/service.posts';

export default function Comments({token, postId, userInfo, postUserId, peopleIFollow}){
	const [text, setText] = useState('');
	const [commentsList, setCommentsList] = useState([]);    

	useEffect(()=>{
		getComments(token, postId).then((res)=>{
			setCommentsList(res.data.comments);
		}).catch();
	},[commentsList]);


	function newComment(){
		postComment(token, postId, text).then(()=>{
			setText('');
		}).catch();
	}
    
	return(
		<CommentsContainer>
			{(commentsList.length) ? commentsList.map((comment)=>{
				return (
					<>
						<CommentBox key={comment.id}>
							<UserIcon src={comment.user.avatar}/>
							<CommentInfo>
								<Username>{comment.user.username}</Username>
								<UserTag>
									{(comment.user.id === postUserId) 
										? '• post\'s author' 
										: (peopleIFollow.includes(comment.user.id)
											?'• following'
											: ''
										)
									}
								</UserTag>
							</CommentInfo>
							<CommentText>{comment.text}</CommentText>
						</CommentBox>
						<Separator />
					</>
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

const CommentBox = styled.div`
    width: 100%;
    height: auto;
    min-height: 70px;
    padding: 15px 20px 19px 62px; 
    position: relative;   
`;

const UserIcon = styled.img`
    position: absolute;
    width: 39px;
    height: 39px;
    left: 5px;
    top: 15px;
    border-radius: 20px;
`;

const CommentInfo = styled.div`
    display: flex;
`;

const Username = styled.p`
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #F3F3F3;
`;

const UserTag = styled.p`
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
    margin-left: 4px;
`;

const CommentText = styled.p`
    margin-top: 2px;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    word-break: break-word;
	overflow: hidden;
    color: #ACACAC;
`;

const Separator = styled.div`
    width: 100%;
    height: 1px ;
    background-color: #565656;
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
