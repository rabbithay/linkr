import axios from 'axios';
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/';

const signUpAPI = (email, password, username, pictureUrl) => {
	let body = 
	{
		email,
		password,
		username,
		pictureUrl
	};
	
	const promise = axios.post(URL + 'sign-up', body);
	return promise;
};

const signInAPI = (email, password) => {
	let body = 
	{
		email,
		password
	};

	const promise = axios.post(URL + 'sign-in', body);
	return promise;
};

export {
	signUpAPI,
	signInAPI
};