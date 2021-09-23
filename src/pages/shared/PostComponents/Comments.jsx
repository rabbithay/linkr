import React from 'react';
import styled from 'styled-components';
import { PaperPlaneOutline } from 'react-ionicons';

export default function Comments(){
	
	return(
		<CommentsContainer>
			
				return (
			<>
				<CommentBox>
					<UserIcon />
					<CommentInfo>
						<Username>{}</Username>
						<UserTag>• following</UserTag>
					</CommentInfo>
					<CommentText>{}</CommentText>
				</CommentBox>
				<Separator />
			</>
				); 
			<CommentBox>
				<UserIcon />
				<CommentInput 
					placeholder="write a comment..." 
					type='text'
				/>
				<SendComment  >
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
`;

const SendComment = styled.button`
    z-index: 1;
    position: absolute;
    right: 10px;
    top: 30px;
    background-color: transparent;
    cursor: pointer;

`;
