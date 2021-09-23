// TODO: Tirar isso aqui
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SearchSharp } from 'react-ionicons';

import { getSearching } from '../../service/service.posts';
import UserContext from '../../contexts/UserContext';


export default function SearchBar() {
	// - [x]  Agora no topo do site deve ser exibida uma caixa de busca, seguindo
	// layout
	// - [ ]  A cada letra digitada na busca, deve ser disparada uma busca no
	// servidor e os resultados devem ser exibidos conforme layout
	// - [ ]  A busca só deve ser disparada quando o usuário digitou pelo menos 3
	// caracteres e esperando o usuário ficar sem digitar por pelo menos 300ms.
	// 		**Dica**: essa técnica se chama debounce, tem uma lib que pode te
	// ajudar: **react-debounce-input**
	// - [ ]  Ao exibir os resultados, deve-se mostrar no topo os usuários que
	// você já segue, com a indicação de "following" seguindo layout. Esse
	// tratamento deve ser feito no front, o servidor não responderá de forma
	// ordenada
	// - [ ]  Ao clicar em um resultado, deve-se redirecionar o usuário para a
	// página de perfil daquele usuário
	const { userInfo: { token } } = useContext(UserContext);
	const [searchText, setSearchText] = useState('');
	const [searchList, setSearchList] = useState([]);

	useEffect(() => {
		if (token) {
			getSearching({ token, searchText })
				.then(({ data: { users } }) => {
					setSearchList(users);
					console.log(users);
				})
				.catch(({ response }) => console.log(response));
		}
	}, [searchText]);

	const makeSomeonesLi = ({ id, username, avatar }) => {
		return (
			<Link key={id} to={`/user/${id}`}>
				<li onClick={() => console.log(searchText)}>
					<img src={avatar} />
					<h1>{username}</h1>
					<h2>• following</h2>
				</li>
			</Link>
		);
		
	};

	const teste1 = {
		id: 10,
		username: 'João Banguelus',
		avatar: 'https://i.pinimg.com/originals/9c/f3/8c/9cf38c6ba47dcb942ac4b38ca956bfb2.jpg'
	};
	const teste2 = {...teste1, id: 15};
	const teste3 = {...teste1, id: 24};

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
				{searchList.map((option) => makeSomeonesLi(option))}
				{/* {makeSomeonesLi(teste1)}
				{makeSomeonesLi(teste2)}
				{makeSomeonesLi(teste3)} */}

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
	padding-top: 20px;
	margin-top: -18px;
	background-color: #E7E7E7;
	border-radius: 8px;

	li {
		height: calc(2 * 8px + 39px);
		display: flex;
		align-items: center;
		padding-left: 17px;

		img {
			width: 39px;
			height: 39px;
			margin-right: 12px;
			border-radius: 50%;
		}

		h1 {
			margin-right: 8px;
			font-size: 19px;
			line-height: 23px;
			color: #515151;
		}

		h2 {
			font-size: 19px;
			line-height: 23px;
			color: #C5C5C5;
		}
	}

	li:last-child {
		padding-bottom: 15px;
	}
	`;


/* eslint-enable no-unused-vars */