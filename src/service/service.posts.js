import axios from 'axios';
const POSTS_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts';

const createPostAPI = (text, link, token) => {
	const body = {
		text,
		link
	};
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	const promise = axios.post(POSTS_URL, body, config);
	return promise;
};

export {
	createPostAPI
};