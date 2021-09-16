import axios from 'axios';


const API_HASHTAG = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags';

const isDeveloping = true; // TODO: Tirar 

const makeConfig = (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	
	return config;
};

const getHashtagTrending = (token) => {
	const promise = axios.get(`${API_HASHTAG}/trending`, makeConfig(token));
	if (isDeveloping) {
		console.log(promise);
	}
	return promise;
};

const getHashtagPosts = (token, hashtag) => {
	const promise = axios.get(`${API_HASHTAG}/${hashtag}/posts`, makeConfig(token));
	console.log('hashtagPosts\n', promise);
	return promise;
};


export { getHashtagTrending, getHashtagPosts };
