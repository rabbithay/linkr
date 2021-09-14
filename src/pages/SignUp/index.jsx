import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { signUpAPI } from '../../service/service.auth';


function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const ruleRegexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const ruleRegexURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

	const ThrowSwalError = (text) => {
		Swal.fire({
			icon: 'error',
			title: 'Quase lá!',
			text: text,
		});
	};

	const regex = (str, rule) => {
		return (rule.test(str));
	};

	const ValidateInputs = () => {
		if (email.length === 0 || password.length === 0 || name.length === 0 || imgUrl.length === 0) {
			ThrowSwalError('Você deve preencher todos os campos');
			return;
		}

		if (!regex(email, ruleRegexEmail)) {
			ThrowSwalError('Insira um e-mail é válido');
		}
		else if (!regex(imgUrl, ruleRegexURL)) {
			ThrowSwalError('Insira uma url válida');
		}
		else {
			HandleResponseFromAPI();
		}
	};
    
	const HandleResponseFromAPI = () => {
		setLoading(true);
		signUpAPI(email, password, name, imgUrl)
			.then(() => history.push('/'))
			.catch(() => {
				ThrowSwalError('Esse e-mail já está cadastrado');
				setLoading(false);
			});
	};
	return (
		<SignUpPage>
			<Disclaimer>
				<Title>linkr</Title>
				<Description>
                    save, share and discover<br />the best links on the web
				</Description>
			</Disclaimer>
			<Form >
				<Input 
					required
					type='email'
					placeholder='e-mail'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<Input
					required
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)} value={password}
				/>
				<Input
					required
					type='text'
					placeholder='name'
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<Input
					required
					type='url'
					placeholder='picture url'
					onChange={(e) => setImgUrl(e.target.value)}
					value={imgUrl}
				/>

				<Button type='submit' loading={loading ? 1 : 0} onClick={ValidateInputs}>
                    Sign Up
				</Button>

				<Link to='/'>
					<P>Switch back to log in</P>
				</Link>
			</Form>
		</SignUpPage>
	);
}

const SignUpPage = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    font-weight: bold;

    @media(max-width: 600px) {
        flex-direction: column;
    }
`;

const Disclaimer = styled.div`
    width: 65%;
    height: 100%;
    background-color: #151515;
    box-shadow: 4px 0px 4px 0px #00000040;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 10%;

    @media(max-width: 600px) {
        align-items: center;
        padding-left: 0px;
        width: 100%;
        height: 25%;
    }
`;

const Title = styled.p`
    font-size: 106px;
    margin-bottom: 25px;
    font-family: 'Passion one';

    @media(max-width: 600px) {
        margin-bottom: 0px;
        font-size: 85px;
    }
`;

const Description = styled.p`
    font-size: 43px;
    font-family: 'Oswald';
    
    @media(max-width: 600px) {
        font-size: 23px;
    }
`;

const Form = styled.div`
    width: 35%;
    height: 100%;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media(max-width: 600px) {
        justify-content: flex-start;
        padding-top: 10%;
        width: 100%;
        height: 75%;
    }
`;

const Input = styled.input`
    width: 80%;
    height: 65px;
    background: #FFFFFF;
    color: #9F9F9F;
    border-radius: 6px;
    margin-bottom: 13px;
    font-size: 20px;
    padding-left: 12px;
    font-weight: bold;
    font-family: 'Oswald';
`;

const Button = styled.button`
    width: 80%;
    height: 65px;
    background: #1877F2;
    color: #FFFFFF;
    border-radius: 6px;
    margin-bottom: 13px;
    cursor: pointer;
    pointer-events: ${props => props.loading ? 'none' : 'all'};
    font-size: 20px;
    padding-left: 12px;
    font-weight: bold;
    font-family: 'Oswald';
`;

const P = styled.p`
    color: #FFFFFF;
    text-decoration: underline;
    font-size: 18px;
    font-family: 'Lato';
    font-weight: normal;
`;

export default SignUp;