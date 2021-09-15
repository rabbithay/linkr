import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts';

export default function CreatePost() {
	const [link, setLink] = useState('');
	const [linkDescription, setLinkDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const user = {
		'token': '1f9d51f4-a0a4-4c1d-9f81-879c3a35afa9',
		'user': {
			'id': 517,
			'email': 'victor@durco.com',
			'username': 'Durço',
			'avatar': 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/517/avatar'
		}
	};

	const createPostAPI = (body, config) => {
		const promise = axios.post(URL, body, config);
		return promise;
	};

	const createBody = () => {
		const body = {
			text: linkDescription,
			link: link
		};
		return body;
	};

	const createConfig = () => {
		const config = {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		};
		return config;
	};

	const publishPost = (e) => {
		e.preventDefault();
		if (link === '') {
			Swal.fire('O link não pode estar vazio 🙄');
			return;
		}
		setLoading(true);
		createPostAPI(createBody(), createConfig())
			.then(() => {
				setLoading(false);
				setLinkDescription('');
				setLink('');
				//atualizarTimeline()
			})
			.catch(() => {
				setLoading(false);
				Swal.fire('Houve um erro ao publicar seu link 😥');
			});

	};

	return (
		<Container>
			<img src={user.user.avatar} alt='perfil' />
			<PostContent>
				<form onSubmit={publishPost}>
					<h2>O que você tem pra favoritar hoje?</h2>
					<fieldset>
						<Link
							type='url'
							placeholder='http:// ...'
							value={link}
							onChange={e => setLink(e.target.value)}
							loading={loading}
						/>
						<LinkDescription
							placeholder='Comente alguma coisa sobre esse link'
							value={linkDescription}
							onChange={e => setLinkDescription(e.target.value)}
							loading={loading}
						/>
						{loading ?
							<button >Publicando...</button>
							:
							<button type='submit'>Publicar</button>
						}
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
		@media(max-width: 600px){
			display: none;
		}
	}

	@media(max-width: 600px){
		width: 100%;
		height: 164px;
		border-radius: 0;
		justify-content: center;
		padding: 10px 15px 12px 15px;
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
		@media(max-width: 600px){
			text-align: center;
			font-size: 17px;
			margin-bottom: 14px;
		}
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
		@media(max-width: 600px){
			height: 22px;
			right: 15px;
			bottom: 12px;
			font-size: 13px;
		}
	}

	@media(max-width: 600px){
		width: 100%;
		align-items: center;

		form{
			width: 100%;
		}
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
		pointer-events: ${ props => props.loading? 'none':'initial'};
		@media(max-width: 600px){
			width: 100%;
		}
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
		pointer-events: ${ props => props.loading? 'none':'initial'};

		@media(max-width: 600px){
			height: 47px;
			width: 100%;
		}
`;