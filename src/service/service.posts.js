import axios from 'axios';
const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts';

function getPosts (config) {
	return axios.get(BASE_URL, config);
}

export {
	getPosts
};