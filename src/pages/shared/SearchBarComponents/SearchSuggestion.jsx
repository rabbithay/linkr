import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function SearchSuggestion({ someonesInfo, followIdsList, setSearchText }) {
	const { id, username, avatar } = someonesInfo;
	const isFollowing = followIdsList.includes(id);

	return (
		<Link
			onClick={() => setSearchText('')}
			to={`/user/${id}`}
		>
			<Li isFollowing={isFollowing}>
				<img src={avatar} />
				<h1>{username}</h1>
				{isFollowing
					? <h2>• following</h2>
					: <></>
				}
			</Li>
		</Link>
	);
}

const Li = styled.li`
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
`;
