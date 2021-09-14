import axios from 'axios';

const SignUpAPI = (email, password, username, pictureUrl) => {
    let body = 
    {
        email,
        password,
        username,
        pictureUrl
    };
    
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', body);
    return promise
}

export {
    SignUpAPI
}