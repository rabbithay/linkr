import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr';

const getPosts = (config) => {
	return axios.get(`${BASE_URL}/posts`, config);
};

const getUserPosts = (config, userId) => {
	return axios.get(`${BASE_URL}/users/${userId}/posts`, config);
};

const postLikeOrDislike = (config, postId, action) => {
	console.log(`${BASE_URL}/posts/${postId}/${action}`, config);
	return axios.post(`${BASE_URL}/posts/${postId}/${action}`,{}, config);
};

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
	getSomeonesPosts,
	postLikeOrDislike,
	editPost,
};