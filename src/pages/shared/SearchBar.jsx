// TODO: Tirar isso aqui
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SearchSharp } from 'react-ionicons';
import { DebounceInput } from 'react-debounce-input';

import { getSearching, getFollows } from '../../service/service.posts';
import UserContext from '../../contexts/UserContext';


export default function SearchBar({ inHeader }) {
	const { userInfo: { token } } = useContext(UserContext);
	const [searchText, setSearchText] = useState('');
	const [searchList, setSearchList] = useState([]);
	const [followIdsList, setFollowIdsList] = useState([]);
	const [isOnFocus, setIsOnFocus] = useState(false);
	const history = useHistory();

	
	const updateSuggestionsList = () => {
		if (token) {
			getSearching({ token, searchText })
				.then(({ data: { users } }) => orderFollowsList(users));
		}
	};
	
	const orderFollowsList = (usersList) => {
		const followUsers = [];
		const unfollowUsers = [];
		
		usersList.forEach((user) => {
			if (followIdsList.includes(user.id)) followUsers.push(user);
			else unfollowUsers.push(user);
		});
		
		setSearchList([...followUsers, ...unfollowUsers]);
	};

	const updateFollowIdsList = () => {
		if (token) {
			getFollows({ token })
				.then(({ data: { users } }) => {
					setFollowIdsList(users.map(({ id }) => id));
				});
		}
	};
	
	const makeSuggestion = ({ id, username, avatar }) => {
		const isFollowing = followIdsList.includes(id);
		return (
			<Link key={id} to={`/user/${id}`}>
				<li isFollowing={isFollowing}>
					<img src={avatar} />
					<h1>{username}</h1>
					{isFollowing
						? <h2>• following</h2>
						: <></>
					}
				</li>
			</Link>
		);
	};

	const handleSubmit = () => {
		if (searchText.includes('#')) {
			history.push(`/hashtag/${
				searchText
					.replaceAll('#', '')
					.replaceAll(' ', '')
			}`);
		}
		setSearchText('');
	};

	const handleClickOutside = () => {
		setTimeout(() => setIsOnFocus(false), 10);
	};
	
	
	useEffect(updateFollowIdsList, [token]);
	
	useEffect(updateSuggestionsList, [searchText]);


	return (
		<Container onSubmit={handleSubmit} inHeader={inHeader} >
			<div>
				{/* TODO: Descobrir porque está matando duas letras quando
				vou apagando o search */}
				<DebounceInput
					type="text"
					placeholder='Search for people and friends'
					minLength={3}
					debounceTimeout={300}
					onChange={({ target : { value }}) => setSearchText(value)}
					value={searchText}
					onFocus={() => setIsOnFocus(true)}
					onBlur={handleClickOutside}
				/>

				<IconWrapper onClick={handleSubmit}>
					<SearchSharp
						color={'#C6C6C6'} 
						height="21px"
						width="21px"
					/>
				</IconWrapper>
			</div>

			<SuggestionsWrapper isOnFocus={isOnFocus}>
				{searchList.map((searchUser) => makeSuggestion(searchUser))}
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

	z-index: 10;
	position: absolute;
	top: 13px;
	left: 30%;
	width: 40%;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	border-width: 0px;
	${(p) => !p.inHeader ? 'display: none;' : ''}
	
	
	@media (max-width: 611px) {
		width: 96%;
		left: 2%;
		margin-top: 72px;
		display: flex;
		flex-direction: column;
		${(p) => p.inHeader ? 'display: none;' : ''}
  }
	
	> div {
		z-index: 2;
		width: 100%;	
		height: 45px;
		display: flex;
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

		@media (max-width: 611px) {
			font-size: 17px;
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
	margin-left: -1px;
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
	display: ${(p) => p.isOnFocus ? 'flex' : 'none'};
	flex-direction: column;

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
			max-width: ${(p) => {
		return (
			p.isFollowing
				? 'calc(40vw - (2 * 17px + 12px + 39px + 2 * 8px + 92px))'
				: 'calc(40vw - (2 * 17px + 12px + 39px + 2 * 8px + 0px))'
		);
	}};
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 8px;
			font-size: 19px;
			line-height: 23px;
			color: #515151;
			word-break: break-word;
			display: -webkit-box;
			-webkit-line-clamp: 2;
  		-webkit-box-orient: vertical;

			@media (max-width: 611px) {
				max-width: ${(p) => {
		return (
			p.isFollowing
				? 'calc(96vw - (2 * 17px + 12px + 39px + 2 * 8px + 92px))'
				: 'calc(96vw - (2 * 17px + 12px + 39px + 2 * 8px + 0px))'
		);
	}};
			}
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
