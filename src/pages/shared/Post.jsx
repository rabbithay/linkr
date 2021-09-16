import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Post({postInfo}){
	const { text, link, user, linkImage, linkTitle, linkDescription } = postInfo;
	const { avatar, username } = user;

	function hashtag(text){
		const repl = text.replace(/#(\w+)/g, '<a href="/hashtag/$1">#$1</a>');
		return repl;
	}
	
	return (
		<PostContainer>
			<Link to={`/user/${user.id}`}><UserIcon alt='avatar' src={avatar} /></Link>
			<PostContent>
				<Link to={`/user/${user.id}`}><h3>{username}</h3></Link>	
				<div dangerouslySetInnerHTML={{ __html: `<p >${hashtag(text)}</p>` }} />
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


const PostContainer = styled.div`
	width: 611px;
	height: auto;
	border-radius: 16px;
	background-color: #171717;
	margin-top: 16px;
	padding: 17px 21px 20px 18px;
	display: inline-flex;
	gap: 18px;
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
