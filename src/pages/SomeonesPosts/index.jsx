import React from 'react';
import { useParams } from 'react-router-dom';

import { getSomeonesPosts } from '../../service/service.posts';

import MainPage from '../shared/MainPage';


export default function SomeonesPostsTest() {
	const { id: someonesId } = useParams();
	return (
		<MainPage 
			getPosts={getSomeonesPosts}
			titleText={`${someonesId}'s Posts`}
			params={{someonesId}}
			isSomeonesPage
		/>
	);
}
