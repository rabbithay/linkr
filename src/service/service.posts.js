import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr';

function getPosts (config) {
	return axios.get(`${BASE_URL}/posts`, config);
}

function getUserPosts(config, userId){
	console.log({config, userId});
	return axios.get(`${BASE_URL}/users/${userId}/posts`, config);
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
	const promise = axios.post(`${BASE_URL}/posts`, body, config);
	return promise;
};

const getSomeonesPosts = (userId, token) => {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	const promise = axios.get(`${BASE_URL}/users/${userId}/posts`, config);
	return promise;
};


export {
	getPosts,
	createPostAPI,
	getUserPosts,
	getSomeonesPosts
};