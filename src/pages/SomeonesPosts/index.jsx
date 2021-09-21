import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSomeonesPosts, getSomeonesName } from '../../service/service.posts';

import MainPage from '../shared/MainPage';


export default function SomeonesPosts() {
	
	const [titleText, setTitleText] = useState(undefined);
	const { id: someonesId } = useParams();
	if (someonesId === -1) console.log(setTitleText);

	const updateTitle = (token, someonesId) => {
		console.log(titleText);
		if (someonesId) {
			getSomeonesName(token, someonesId)
				.then(({ data: { user: { username } } }) => setTitleText(`${username}'s Posts`))
				.catch(({ response }) => console.log(response));
		}
	};
	
	return (
		<MainPage 
			getPosts={getSomeonesPosts}
			titleText={titleText}
			params={{someonesId}}
			updateTitle={updateTitle}
		/>
	);
}
