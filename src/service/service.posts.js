import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts';
const USERS_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users';

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

const getSomeonesPosts = (userId, token) => {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	const promise = axios.get(`${USERS_URL}/${userId}/posts`, config);
	return promise;
};


export {
	getPosts,
	createPostAPI,
	getSomeonesPosts
};