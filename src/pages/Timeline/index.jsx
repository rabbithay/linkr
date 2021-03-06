import React from 'react';

import { getTimelinePosts } from '../../service/service.posts';

import MainPage from '../shared/MainPage';
import CreatePost from '../Timeline/CreatePost';


export default function Timeline() {
	return (
		<MainPage 
			getPosts={getTimelinePosts}
			titleText={'timeline'}
			CreatePost={CreatePost}
		/>
	);
}
