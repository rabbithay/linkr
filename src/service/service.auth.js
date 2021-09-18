import axios from 'axios';
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr';

const signUpAPI = (email, password, username, pictureUrl) => {
	const body = {
		email,
		password,
		username,
		pictureUrl
	};
	
	return axios.post(`${URL}/sign-up`, body);
};

const signInAPI = (email, password) => {
	const body = {
		email,
		password
	};

	return axios.post(`${URL}/sign-in`, body);
};

export {
	signUpAPI,
	signInAPI
};