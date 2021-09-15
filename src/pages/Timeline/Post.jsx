import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function Post({postInfo}){
	const { text, link, user, linkImage, linkTitle, linkDescription } = postInfo;
	const { avatar, username } = user;
	return (
		<PostContainer>
			<Link to={`/user/${user.id}`}><UserIcon alt='avatar' src={avatar} /></Link>
			<PostContent>
				<Link to={`/user/${user.id}`}><h3>{username}</h3></Link>
				<p>{text}</p>
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
`;

const UserIcon = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 20px;
`;

const PostContent = styled.div `
	font-family: 'Lato';
	width: 513px;
    h3{
		color: #fff;
		font-size: 19px;
		line-height: 23px;
		margin-bottom: 7px;
    }
    p {
		color: #b7b7b7;
		font-size: 17px;
		line-height: 20px;
		margin-bottom: 14px;
    }
`;

const LinkContainer = styled.div `
	width: 503px;
	height: 155px;
	border: 1px solid #4D4D4D;
	border-radius: 11px;
	display: flex;
	
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
		}
	p{
		font-size: 11px;
		color: #9B9595;
		line-height: 13px;
		max-height: 40px;
	}
	a{
		font-size: 11px;
		color: #CECECE;
		line-height: 13px;
		/* overflow-wrap: break-word;
		word-wrap: break-word;
		word-break: break-word;	} */
		width: 300px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`;

const LinkPreviewImage = styled.img `
	width: 155px;
	height: 155px;
	border: 1px solid #4D4D4D;
	border-radius: 0px 12px 13px 0px;`; 
