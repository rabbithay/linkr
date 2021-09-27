import axios from 'axios';


const API_HASHTAG = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/hashtags';


const makeConfig = (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	
	return config;
};

const getTrending = (token) => {
	return axios.get(`${API_HASHTAG}/trending`, makeConfig(token));
};


export { getTrending };
