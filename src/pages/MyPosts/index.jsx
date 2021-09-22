import React from 'react';

import { getUserPosts } from '../../service/service.posts';

import MainPage from '../shared/MainPage';


export default function MyPosts() {
	return (
		<MainPage 
			getPosts={getUserPosts}
			titleText={'my posts'}
		/>
	);
}
