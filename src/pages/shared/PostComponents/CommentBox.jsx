import React from 'react';
import styled from 'styled-components';

export default function Comment ({comment, postUserId, peopleIFollow}) {
	return (
		<>
			<CommentBox >
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
}

const CommentBox = styled.div`
    width: 100%;
    height: auto;
    min-height: 70px;
    padding: 15px 20px 19px 62px; 
    position: relative;   
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

const UserIcon = styled.img`
    position: absolute;
    width: 39px;
    height: 39px;
    left: 5px;
    top: 15px;
    border-radius: 20px;
`;

export {
	UserIcon,
	CommentBox
};