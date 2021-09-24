import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import { getTrending } from '../../service/service.hashtag';

import ModalAlert from './ModalAlert';


export default function Trending({ loaderIsActive }){
	const { userInfo: { token } } = useContext(UserContext);
	const [hashtagList, setHashtagList] = useState([]);
	const [hashtagText, setHashtagText] = useState('');
	const history = useHistory();

	useEffect(() => {
		if (token) {
			getTrending(token)
				.then(({ data: { hashtags }}) => setHashtagList(hashtags))
				.catch(loadingTrendingError);
		}
	}, [token]);

	const loadingTrendingError = () => {
		const modalObj = {
			icon: 'error',
			title: 'Our mistake >.<',
			description: 'An error occurred on loading the trendings'
		};
		ModalAlert(modalObj);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		history.push(`/hashtag/${hashtagText.replace('#', '').replaceAll(' ', '')}`);
		setHashtagText('');
	};


	return(
		<Container>
			<div className='Title'>
				{loaderIsActive
					? <h1>Loading...</h1>
					: <h1>trending</h1>
				}
			</div>
	
			<HashtagsBox>
				{hashtagList.map(({ id, name }) => {
					return (
						<Link key={id} to={`/hashtag/${name}`}>
							<li>{`# ${name}`}</li>
						</Link>
					);
				})}

				<SearchContainer onSubmit={handleSubmit}>
					<div>#</div>
					<input
						placeholder='type a hashtag'
						onChange={({ target: { value }}) => setHashtagText(value)}
						value={hashtagText}
					/>				
				</SearchContainer>
			</HashtagsBox>
		</Container>	
	);
}


const Container = styled.div`
	width: 301px;
	height: 441px;
	background-color: #171717;
	border-radius: 16px;

	.Title {
		padding-left: 16px;
		height: 15%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #484848;

		h1 {
			font-family: Oswald;
			color: #FFFFFF;
			font-weight: bold;
			font-size: 27px;
			line-height: 40px;
		}
	}
`;

const HashtagsBox = styled.ul`
	width: 100%;
	height: 85%;
	padding: 22px 16px 15px;

	li {
		font-family: Lato;
		font-style: normal;
		font-weight: bold;
		font-size: 19px;
		line-height: 29px;
		letter-spacing: 0.05em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #FFFFFF;
	}
`;

const SearchContainer = styled.form`
	position: relative;
	width: 100%;
	height: 35px;
	margin-top: 15px;
	display: flex;
	border-radius: 8px;
	background-color: #252525;

	div {
		width: calc(11px + 15px);
		padding-left: 15px;
		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-family: Lato;
		font-style: normal;
		font-weight: bold;
		font-size: 19px;
	}
	
	input {
		height: 100%;
		width: calc(100% - 26px);
		padding-left: 11px;
		border-radius: 0 8px 8px 0;
		border-width: 0;
		background-color: #252525;
		font-family: Lato;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		letter-spacing: 0.05em;
		color: #575757;

		::placeholder {
			color: #575757;
		}

		:focus {
			color: #FFFFFF;
			outline: none;
		}
	}
`;
