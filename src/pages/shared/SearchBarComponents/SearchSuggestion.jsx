import React from 'react';
import { Link } from 'react-router-dom';


export default function SearchSuggestion({ someonesInfo, followIdsList, setSearchText }) {
	const { id, username, avatar } = someonesInfo;
	const isFollowing = followIdsList.includes(id);

	return (
		<Link
			isFollowing={isFollowing}
			onClick={() => setSearchText('')}
			to={`/user/${id}`}
		>
			<li>
				<img src={avatar} />
				<h1>{username}</h1>
				{isFollowing
					? <h2>• following</h2>
					: <></>
				}
			</li>
		</Link>
	);
}
