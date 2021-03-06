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

const getTimelinePosts = ({ token, lastPostId, firstPostId }) => {
	if (lastPostId) 
		return axios.get(`${BASE_URL}/following/posts?olderThan=${lastPostId}`, makeConfig(token));
	if (firstPostId) 
		return axios.get(`${BASE_URL}/following/posts?earlierThan=${firstPostId}`, makeConfig(token));
	else
		return axios.get(`${BASE_URL}/following/posts`, makeConfig(token));
};

const getUserPosts = ({ token, userId, lastPostId }) => {
	if (lastPostId)
		return axios.get(`${BASE_URL}/users/${userId}/posts?olderThan=${lastPostId}`, makeConfig(token));
	else
		return axios.get(`${BASE_URL}/users/${userId}/posts`, makeConfig(token));
};

const postLikeOrDislike = (token, postId, action) => {
	return axios.post(`${BASE_URL}/posts/${postId}/${action}`, {}, makeConfig(token));
};

const createPostAPI = (text, link, localization, token) => {
	const body = {
		text,
		link
	};

	if (localization !== {}) {
		body.geolocation = localization;
	}

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

const getSomeonesPosts = ({ token, someonesId, lastPostId }) => {
	if(lastPostId)
		return axios.get(`${BASE_URL}/users/${someonesId}/posts?olderThan=${lastPostId}`, makeConfig(token));
	else
		return axios.get(`${BASE_URL}/users/${someonesId}/posts`, makeConfig(token));
};

const sharePost = (token, id) => {
	return axios.post(`${BASE_URL}/posts/${id}/share`, {}, makeConfig(token));
};

const getMyLikedPosts = ({ token, lastPostId }) => {
	if (lastPostId)
		return axios.get(`${BASE_URL}/posts/liked?olderThan=${lastPostId}`, makeConfig(token));
	else
		return axios.get(`${BASE_URL}/posts/liked`, makeConfig(token));
};

const getHashtagPosts = ({ token, hashtag, lastPostId }) => {
	if (lastPostId)
		return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts?olderThan=${lastPostId}`, makeConfig(token));
	else
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

const getComments = (token, postId) => {
	return axios.get(`${BASE_URL}/posts/${postId}/comments`, makeConfig(token));
};

const postComment = (token, postId, text) => {
	return axios.post(`${BASE_URL}/posts/${postId}/comment`, {text} ,makeConfig(token));
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
	getFollows,
	getComments,
	postComment
};