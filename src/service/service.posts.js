import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr';

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
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	const promise = axios.post(`${BASE_URL}/posts`, body, config);
	return promise;
};

const deletePostAPI = (id, token) =>{
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	const promise = axios.delete(`${BASE_URL}/posts/${id}`, config);
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
	console.log(BASE_URL + `/${id}`, body, config);
	const promise = axios.put(BASE_URL + `/posts/${id}`, body, config);
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
	editPost,
	getSomeonesPosts,
	deletePostAPI
};