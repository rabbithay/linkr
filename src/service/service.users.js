import axios from 'axios';

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users';


const makeConfig = (token) => {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	
	return config;
};

const getFollows = (token) => {
	return axios.get(`${BASE_URL}/follows`, makeConfig(token));
};

export {
	getFollows
};