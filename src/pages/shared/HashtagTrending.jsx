import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import { getHashtagTrending } from '../../service/service.hashtag';


export default function HashtagTrending(){
	const { userInfo: { token } } = useContext(UserContext);
	const [hashtagList, setHashtagList] = useState([{id: '', name: ''}]);

	useEffect(() => {
		getHashtagTrending(token)
			.then(({ data: { hashtags }}) => setHashtagList(hashtags))
			.catch(() => {
				// TODO: Colocar modal; Fazer tratamento de erros
				alert('Deu ruim com a hashtagTrending menor :\'(');
			});

	}, []);


	const makeShortString = (str) => {
		// TODO: Encontrar um tratamento melhor, que seja com base no tamanho da (tela) da str
		const maxLength = 15;

		const shortStr = str.length > maxLength
			? `${str.slice(0, maxLength-1)}...`
			: str;
		
		return shortStr;
	};


	return(
		<Container>
			<div className='Title'>
				<h1>trending</h1>
			</div>

			<HashtagsBox>
				{hashtagList.map(({ id, name }) => {
					return (
						<Link key={id} to={`/hashtag/${id}`}>
							<li>{`# ${makeShortString(name)}`}</li>
						</Link>
					);
				})}
			</HashtagsBox>
			
		</Container>
	);
}


// Styled components
const Container = styled.div`
	position: fixed;
	width: 301px;
	height: 406px;
	right: 18.2%;
	bottom: 20%;
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
		color: #FFFFFF;
	}
`;
