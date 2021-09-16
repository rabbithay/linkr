import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts';

function getPosts (config) {
	return axios.get(BASE_URL, config);
}

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
	const promise = axios.post(BASE_URL, body, config);
	return promise;
};

export {
	getPosts,
	createPostAPI
};