import axios from 'axios';

const signUpAPI = (email, password, username, pictureUrl) => {
	let body = 
	{
		email,
		password,
		username,
		pictureUrl
	};
	
	const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', body);
	return promise;
};

const signInAPI = (email, password) => {
	let body = 
	{
		email,
		password
	};

	const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', body);
	return promise;
};

export {
	signUpAPI,
	signInAPI
};