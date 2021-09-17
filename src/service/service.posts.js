import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr';


const makeConfig = (token) => {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	
	return config;
};

function getPosts (config) {
	return axios.get(`${BASE_URL}/posts`, config);
}

function getUserPosts(config, userId){
	return axios.get(`${BASE_URL}/users/${userId}/posts`, config);
}

const createPostAPI = (text, link, token) => {
	const body = {
		text,
		link
	};
	return axios.post(`${BASE_URL}/posts`, body, makeConfig(token));
};

const getSomeonesPosts = (userId, token) => {
	return axios.get(`${BASE_URL}/users/${userId}/posts`, makeConfig(token));
};

const getMyLikedPosts = (token) => {
	const promise = axios.get(`${BASE_URL}/posts/liked`, makeConfig(token));
	console.log('posts que curti: ', promise);
	return promise;
};


export {
	getPosts,
	createPostAPI,
	getUserPosts,
	getSomeonesPosts,
	getMyLikedPosts
};