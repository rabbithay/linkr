import React from 'react';
import { useParams } from 'react-router-dom';

import { getHashtagPosts } from '../../service/service.posts';

import MainPage from '../shared/MainPage';


export default function HashtagTest() {
	const { hashtag } = useParams();
	return (
		<MainPage 
			getPosts={getHashtagPosts}
			titleText={`# ${hashtag}`}
			params={{hashtag}}
		/>
	);
}
