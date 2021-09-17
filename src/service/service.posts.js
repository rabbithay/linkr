import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts';

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

const editPost = (token, text, id) => {
	const body = {
		text,
	};
	
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	const promise = axios.put(BASE_URL + `/${id}`, body, config);
	return promise;
};

export {
	getPosts,
	createPostAPI,
	editPost
};