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

const getPosts = (config) => {
	return axios.get(`${BASE_URL}/posts`, config);
};

const getUserPosts = (config, userId) => {
	return axios.get(`${BASE_URL}/users/${userId}/posts`, config);
};

const postLikeOrDislike = (config, postId, action) => {
	return axios.post(`${BASE_URL}/posts/${postId}/${action}`,{}, config);
};

const createPostAPI = (text, link, token) => {
	const body = {
		text,
		link
	};
	return axios.post(`${BASE_URL}/posts`, body, makeConfig(token));
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
	const promise = axios.put(`${BASE_URL}/posts/${id}`, body, makeConfig(token));
	return promise;
};

const sharePost = (token, id) => {
	const promise = axios.post(`${BASE_URL}/posts/${id}/share`, {}, makeConfig(token));
	return promise;
};

const getSomeonesPosts = (userId, token) => {
	return axios.get(`${BASE_URL}/users/${userId}/posts`, makeConfig(token));
};

const getMyLikedPosts = (token) => {
	return axios.get(`${BASE_URL}/posts/liked`, makeConfig(token));
};

export {
	getPosts,
	createPostAPI,
	deletePostAPI,
	getUserPosts,
	getSomeonesPosts,
	postLikeOrDislike,
	editPost,
	getMyLikedPosts,
	sharePost,
};