import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function CreatePost() {
	const [link, setLink] = useState('');
	const [linkDescription, setLinkDescription] = useState('');

	const publishPost = (e) => {
		e.preventDefault();
		if (link === ''){
			Swal.fire('O link não pode estar vazio 🙄');
			return;
		}


	};

	return (
		<Container>
			<img src='https://pbs.twimg.com/media/ECa2_i3W4AEm5jd.jpg' alt='perfil' />
			<PostContent>
				<form onSubmit={publishPost}>
					<h2>O que você tem pra favoritar hoje?</h2>
					<fieldset>
						<Link 
							type='url' 
							placeholder='http:// ...'  
							value={link} 
							onChange={e => setLink(e.target.value)}
						/>
						<LinkDescription  
							placeholder='Comente alguma coisa sobre esse link' 
							value={linkDescription} 
							onChange={e => setLinkDescription(e.target.value)}
						/>
						<button type='submit'>Publicar</button>
					</fieldset>
				</form>
			</PostContent>
		</Container>
	);
}

const Container = styled.div`
	width: 611px;
	height: 209px;
	border-radius: 16px;
	background-color: #ffffff;
	box-shadow: 0px 4px 4px 0px #00000040;
	padding: 16px 22px 16px 18px;
	display: flex;
	flex-direction: initial;
	position: relative;
	top: 0;
	left: 0;
	margin: auto auto;
	font-family: 'Lato', sans-serif;
	font-weight: 300;

	img{
		height: 50px;
		width: 50px;
		border-radius: 26.5px;
	}
`;

const PostContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 18px;

	h2{
		color: #707070;
		font-size: 20px;
		margin-bottom: 17px;
	}

	button{
		position: absolute;
		right: 22px;
		bottom: 16px;
		width: 112px;
		height: 31px;
		background-color: #1877F2;
		color: #FFF;
		border-radius: 5px;
		font-size: 17px;
		font-family: 'Lato', sans-serif;
		font-weight: 700;
	}
`;

const Link = styled.input`
		width: 503px;
		height: 30px;
		border-radius: 5px;
		background-color: #EFEFEF;
		border: none;
		margin-bottom:5px;
		padding: 5px 13px;
		font-size: 15px;
		font-family: 'Lato', sans-serif;
		font-weight: 300;
		color: #4a4a4a;
`;

const LinkDescription = styled.textarea`
		width: 503px;
		height: 66px;
		border-radius: 5px;
		background-color: #EFEFEF;
		border: none;
		margin-bottom:5px;
		padding: 8px 12px;
		font-size: 15px;
		font-family: 'Lato', sans-serif;
		font-weight: 300;
		color: #4a4a4a;

`;