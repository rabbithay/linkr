import styled from 'styled-components';
import React from 'react';
import { useState, useContext } from 'react';
import { LocationOutline } from 'react-ionicons';
import ModalAlert from '../shared/ModalAlert';
import { createPostAPI } from '../../service/service.posts';
import UserContext from '../../contexts/UserContext';

export default function CreatePost({ loadTimelinePosts }) {
	const {userInfo} = useContext(UserContext);
	const [link, setLink] = useState('');
	const [linkDescription, setLinkDescription] = useState('');
	const [localizationMode, setLocalizationMode] = useState(false);
	const [localization, setLocalization] = useState({});
	const [loading, setLoading] = useState(false);

	const getUserLocalization = () => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
		
		function onSuccess(pos) {
			const coord = pos.coords;
			setLocalizationMode(true);
			setLocalization({'latitude': coord.latitude,'longitude': coord.longitude});
		}
		
		function onError() {
			const modalObj = 
			{
				title: 'An error occurred on locating you, please enable your navigator localization',
				icon: 'error'
			};
			ModalAlert(modalObj);
		}
		
		if (!localizationMode) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		}
		else {
			setLocalizationMode(false);
			setLocalization({});
		}
	};
	
	const publishPost = (event) => {
		if (event) event.preventDefault();
		
		if (link === '') {
			const modalObj = 
				{
					title: 'The link field cannot be empty 🙄',
				};
			ModalAlert(modalObj);
			return;
		}
		setLoading(true);
		createPostAPI(linkDescription, link, localization, userInfo.token)
			.then(() => {
				setLoading(false);
				setLinkDescription('');
				setLink('');
				loadTimelinePosts();
			})
			.catch(() => {
				setLoading(false);
				const modalObj = 
				{
					title: 'An error occurred on posting your link 😥',
				};
				ModalAlert(modalObj);
			});
	};

	const postOnEnter = (key) => {
		if (key === 'Enter') {
			publishPost();
		}
	};

	return (
		<Container>
			<img src={userInfo.userImg} alt='perfil' />
			<PostContent>
				<form onSubmit={publishPost}>
					<h2>What do you have to favorite today?</h2>
					<fieldset>
						<Link
							type='url'
							placeholder='http:// ...'
							value={link}
							onChange={e => setLink(e.target.value)}
							onKeyUp={(key) => postOnEnter(key.nativeEvent.key)}
							loading={loading? 1:0}
						/>
						<LinkDescription
							placeholder='Say something about this link'
							value={linkDescription}
							onChange={e => setLinkDescription(e.target.value)}
							onKeyUp={(key) => postOnEnter(key.nativeEvent.key)}
							loading={loading? 1:0}
						/>
						{loading ?
							<button >Publicando...</button>
							:
							<button type='submit'>Publicar</button>
						}
					</fieldset>
				</form>
			</PostContent>
			<ToggleLocalization 
				localizationMode={localizationMode}
				onClick={getUserLocalization}
			>
				<LocationOutline
					height="20px"
					width="20px"
				/>
				Localização {localizationMode ? '' : 'des'}ativada 
			</ToggleLocalization>
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
		resize: none;

		::-webkit-scrollbar {
			width: 5px;
		}
		::-webkit-scrollbar-track {
			background: #f1f1f1; 
			border-radius: 5px;
		}
		::-webkit-scrollbar-thumb {
			background: #888; 
			border-radius: 5px;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #555; 
		}
		
		&:focus {
			outline: none;
		}

		@media(max-width: 600px){
			height: 47px;
			width: 100%;
		}
`;

const ToggleLocalization = styled.button`
	height: 20px;
	width: 200px;
	position: absolute;
	bottom: 25px;
	left: 75px;
	background-color: transparent;
	display: flex;
	align-items: center;
	color: ${props => props.localizationMode ? '#238700' : '#949494'};
	cursor: pointer;
	font-family: 'Lato';
	font-weight: 300;
	font-size: 15px;

	@media(max-width: 600px){
		bottom: 15px;
		left: 25px;
	}
`;