import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSomeonesPosts, getSomeonesName } from '../../service/service.posts';
import pageReloadErrorAlert from '../shared/pageReloadErrorAlert';
import MainPage from '../shared/MainPage';


export default function SomeonesPosts() {
	
	const [titleText, setTitleText] = useState(undefined);
	const [profilePhoto, setProfilePhoto] = useState(undefined);
	const { id: someonesId } = useParams();

	const updateTitle = (token, someonesId) => {
		if (someonesId) {
			getSomeonesName(token, someonesId)
				.then(({ data: { user: { username, avatar } } }) => {
					setTitleText(`${username}'s Posts`);
					setProfilePhoto(avatar);
				})
				.catch(pageReloadErrorAlert);
		}
	};
	
	return (
		<MainPage 
			getPosts={getSomeonesPosts}
			titleText={titleText}
			params={{someonesId}}
			updateTitle={updateTitle}
			profilePhoto={profilePhoto}
		/>
	);
}
