import React from 'react';
// import { useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import HashtagTrending from '../shared/HashtagTrending';
// import UserContext from '../../contexts/UserContext';


export default function Hashtag(){
	// const { userInfo: { token } } = useContext(UserContext);
	const respAPI = {
		'posts': [
			{
				'id': 2,
				'text': 'Never Gonna Give You Up #rickroll',
				'link': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				'linkTitle': 'Rick Astley - Never Gonna Give You Up (Video)',
				'linkDescription': 'Rick Astley\'s official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...',
				'linkImage': 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
				'user': {
					'id': 1,
					'username': 'teste',
					'avatar': 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar'
				},
				'likes': [
					{
						'id': 1,
						'userId': 1,
						'postId': 2,
						'createdAt': '2021-05-24T18:55:37.544Z',
						'updatedAt': '2021-05-24T18:55:37.544Z',
						'user.id': 1,
						'user.username': 'teste'
					},
					{
						'id': 2,
						'userId': 4,
						'postId': 2,
						'createdAt': '2021-05-25T17:41:50.248Z',
						'updatedAt': '2021-05-25T17:41:50.248Z',
						'user.id': 4,
						'user.username': 'lalalabanana'
					}
				]
			}
		]
	};
	const { posts } = respAPI;
	const { hashtag } = useParams();
	console.log({hashtag});
	return(
		<>
			<HeaderTest />

			<MainBodyTest>
				{posts.map((post, index) => {
					<PostContainerTest key={index}>

					</PostContainerTest>;
				})}

				<HashtagTrending />
			</MainBodyTest>
		</>
	);
}


const HeaderTest = styled.header`
	width: 100%;
	height: 72px;
	background-color: #151515;
`;

const MainBodyTest = styled.div`
	width: 100%;
	height: calc(100vh - 72px);
	background-color: #333333;
`;

const PostContainerTest = styled.div`
	width: 661px;
	height: 276px;
`;