// TODO: Tirar isso aqui
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SearchSharp } from 'react-ionicons';

import { getSearching, getFollows } from '../../service/service.posts';
import UserContext from '../../contexts/UserContext';


export default function SearchBar() {
	// - [x]  Agora no topo do site deve ser exibida uma caixa de busca, seguindo
	// layout
	// - [x]  A cada letra digitada na busca, deve ser disparada uma busca no
	// servidor e os resultados devem ser exibidos conforme layout
	// - [ ]  A busca só deve ser disparada quando o usuário digitou pelo menos 3
	// caracteres e esperando o usuário ficar sem digitar por pelo menos 300ms.
	// 		**Dica**: essa técnica se chama debounce, tem uma lib que pode te
	// ajudar: **react-debounce-input**
	// - [x]  Ao exibir os resultados, deve-se mostrar no topo os usuários que
	// você já segue, com a indicação de "following" seguindo layout. Esse
	// tratamento deve ser feito no front, o servidor não responderá de forma
	// ordenada
	// - [x]  Ao clicar em um resultado, deve-se redirecionar o usuário para a
	// página de perfil daquele usuário
	const { userInfo: { token } } = useContext(UserContext);
	const [searchText, setSearchText] = useState('');
	const [searchList, setSearchList] = useState([]);
	const [followsList, setFollowsList] = useState([]);

	
	const updateSuggestionsList = () => {
		if (searchText.length < 3) return setSearchList([]);
		
		if (token) {
			getSearching({ token, searchText })
				.then(({ data: { users } }) => orderFollowsList(users));
		}
	};
	
	const orderFollowsList = (usersList) => {
		const followUsers = [];
		const unfollowUsers = [];
		const followingIds = followsList.map(({ id }) => id);
		
		usersList.forEach((user) => {
			if (followingIds.includes(user.id)) followUsers.push(user);
			else unfollowUsers.push(user);
		});
		
		setSearchList([...followUsers, ...unfollowUsers]);
	};

	const updateFollowList = () => {
		if (token) {
			getFollows({ token })
				.then(({ data: { users } }) => setFollowsList(users));
		}
	};
	
	const makeSomeonesLi = ({ id, username, avatar }) => {
		return (
			<Link key={id} to={`/user/${id}`}>
				<li>
					<img src={avatar} />
					<h1>{username}</h1>
					<h2>• following</h2>
				</li>
			</Link>
		);
	};
	
	
	useEffect(updateFollowList, [token]);
	
	useEffect(updateSuggestionsList, [searchText]);


	return (
		<Container>
			<div>
				<input
					type="text"
					placeholder='Search for people and friends'
					onChange={({ target : { value }}) => setSearchText(value)}
					value={searchText}
				/>

				<IconWrapper>
					<SearchSharp
						color={'#C6C6C6'} 
						height="21px"
						width="21px"
					/>
				</IconWrapper>
			</div>

			<SuggestionsWrapper>
				{/* TODO: Bruna, é proposital estar dando display no max em 2.5
				usuários, foi pensado nisso para o usuário saber que a lista continua
				PS.: se não tiver nada a refazer nesse PR, pode aceitar que eu tiro
				esse todo quando for mexer no próximo requisito \o/ */}
				{searchList.map((searchOption) => makeSomeonesLi(searchOption))}

			</SuggestionsWrapper>

		</Container>
	);
}


const Container = styled.form`
	* {
		font-family: Lato;
		font-style: normal;
		font-weight: normal;
	}

	position: absolute;
	top: 13px;
	left: 30%;
	width: 40%;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	border-width: 0px;
	
	> div {
		z-index: 2;
		height: 45px;
		display: flex;
		width: 100%;	
	}

	input {
		width: calc(100% - (21px + 2 * 13px));
		height: 100%;
		padding-left: 17px;
		font-size: 19px;
		line-height: 23px;
		color: #C6C6C6;
		background: #FFFFFF;
		border-radius: 8px 0 0 8px;
		border-width: 0px;

		::placeholder {
			color: #C6C6C6;
		}

		:focus {
			color: #515151;
			outline: none;
		}
	}
`;

const IconWrapper = styled.div`
	height: 100%;
	width: calc(21px + 2 * 13px);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 13px 0;
	border-radius: 0 8px 8px 0;
	background-color: #FFFFFF;
`;

const SuggestionsWrapper = styled.ul`
	width: 100%;
	max-height: calc(20px + 2.5 * 55px);
	overflow: auto;
	padding-top: 20px;
	margin-top: -18px;
	background-color: #E7E7E7;
	border-radius: 8px;

	li {
		width: 100%;
		height: calc(2 * 8px + 39px);
		display: flex;
		align-items: center;
		padding: 8px 17px;

		img {
			width: 39px;
			height: 39px;
			margin-right: 12px;
			border-radius: 50%;
		}

		h1 {
			max-width: calc(40vw - (2 * 17px + 12px + 39px + 2 * 8px + 92px));
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 8px;
			font-size: 19px;
			line-height: 23px;
			color: #515151;
			word-break: break-word;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* number of lines to show */
  		-webkit-box-orient: vertical;
		}

		h2 {
			font-size: 19px;
			line-height: 23px;
			color: #C5C5C5;
		}
	}
	a:last-child {
		padding-bottom: 15px;
	}

	::-webkit-scrollbar {
		display: none;
	}
`;

/* eslint-enable no-unused-vars */
