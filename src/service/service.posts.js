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

const getTimelinePosts = ({ token }) => {
	return axios.get(`${BASE_URL}/posts`, makeConfig(token));
};

const getUserPosts = ({ token, userId }) => {
	return axios.get(`${BASE_URL}/users/${userId}/posts`, makeConfig(token));
};

const createPostAPI = (text, link, token) => {
	const body = {
		text,
		link
	};
	return axios.post(`${BASE_URL}/posts`, body, makeConfig(token));
};

const editPost = (token, text, id) => {
	const body = {
		text,
	};
	const promise = axios.put(`${BASE_URL}/posts/${id}`, body, makeConfig(token));
	return promise;
};

const getSomeonesPosts = ({ token, someonesId }) => {
	return axios.get(`${BASE_URL}/users/${someonesId}/posts`, makeConfig(token));
};

const getMyLikedPosts = ({ token }) => {
	return axios.get(`${BASE_URL}/posts/liked`, makeConfig(token));
};

const getHashtagPosts = ({ token, hashtag }) => {
	return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts`, makeConfig(token));
};

export {
	getTimelinePosts,
	createPostAPI,
	getUserPosts,
	getSomeonesPosts,
	getMyLikedPosts,
	editPost,
	getHashtagPosts
};