import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import { getTrending } from '../../service/service.hashtag';

import ModalAlert from './ModalAlert';


export default function Trending({ loaderIsActive }){
	const { userInfo: { token } } = useContext(UserContext);
	const [hashtagList, setHashtagList] = useState([]);

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


	return(
		<Container>
			<div className='Title'>
				{loaderIsActive
					? <h1>Carregando...</h1>
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
			</HashtagsBox>
		</Container>	
	);
}


const Container = styled.div`
	width: 301px;
	height: 406px;
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
	padding: 22px 16px 30px;

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
