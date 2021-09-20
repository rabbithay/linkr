import React from 'react';

import { getMyLikedPosts } from '../../service/service.posts';

import MainPage from '../shared/MainPage';


export default function MyLikesTest() {
	return (
		<MainPage 
			getPosts={getMyLikedPosts}
			titleText={'my likes'}
		/>
	);
}
