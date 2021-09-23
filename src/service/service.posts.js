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

const postLikeOrDislike = (token, postId, action) => {
	return axios.post(`${BASE_URL}/posts/${postId}/${action}`, {}, makeConfig(token));
};

const createPostAPI = (text, link, token) => {
	const body = {
		text,
		link
	};

	return axios.post(`${BASE_URL}/posts`, body, makeConfig(token));
};

const deletePostAPI = (id, token) => {
	return axios.delete(`${BASE_URL}/posts/${id}`, makeConfig(token));
};

const editPost = (token, text, id) => {
	const body = {
		text,
	};

	return axios.put(`${BASE_URL}/posts/${id}`, body, makeConfig(token));
};

const getSomeonesPosts = ({ token, someonesId }) => {
	return axios.get(`${BASE_URL}/users/${someonesId}/posts`, makeConfig(token));
};

const sharePost = (token, id) => {
	return axios.post(`${BASE_URL}/posts/${id}/share`, {}, makeConfig(token));
};

const getMyLikedPosts = ({ token }) => {
	return axios.get(`${BASE_URL}/posts/liked`, makeConfig(token));
};

const getHashtagPosts = ({ token, hashtag }) => {
	return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts`, makeConfig(token));
};

const getSomeonesName = (token, someonesId) => {
	return axios.get(`${BASE_URL}/users/${someonesId}`, makeConfig(token));
};

const getSearching = ({ token, searchText }) => {
	return axios.get(`${BASE_URL}/users/search?username=${searchText}`, makeConfig(token));
};

const getFollows = ({ token }) => {
	return axios.get(`${BASE_URL}/users/follows`, makeConfig(token));
};


export {
	getTimelinePosts,
	createPostAPI,
	deletePostAPI,
	getUserPosts,
	getSomeonesPosts,
	postLikeOrDislike,
	editPost,
	getMyLikedPosts,
	getHashtagPosts,
	getSomeonesName,
	sharePost,
	getSearching,
	getFollows
};