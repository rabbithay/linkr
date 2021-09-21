import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ModalAlert from '../shared/ModalAlert';
import Loader from 'react-loader-spinner';

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

	const throwSwalError = (text) => {
		const modalObj = 
		{
			icon: 'error',
			title: text
		};
		ModalAlert(modalObj);
	};

	const regex = (str, rule) => {
		return (rule.test(str));
	};

	const validateInputs = () => {
		if (email.length === 0 || password.length === 0 || name.length === 0 || imgUrl.length === 0) {
			throwSwalError('You must fill all the fields');
			return;
		}

		if (!regex(email, ruleRegexEmail)) {
			throwSwalError('Insert a valid e-mail');
		}
		else if (!regex(imgUrl, ruleRegexURL)) {
			throwSwalError('Insert a valid url');
		}
		else {
			handleResponseFromAPI();
		}
	};
    
	const handleResponseFromAPI = () => {
		setLoading(true);
		signUpAPI(email, password, name, imgUrl)
			.then(() => history.push('/'))
			.catch((e) => {
				if (e.response.data.message === 'Invalid param: pictureUrl') {
					throwSwalError('Unfortunately we cannot use this image, could you use another one? 🥺');
				}
				else {
					throwSwalError('This e-mail is already registered');
				}
				setLoading(false);
			});
	};

	const loginOnEnter = (key) => {
		if (key === 'Enter') {
			validateInputs();
		}
	};

	return (
		<SignUpPage>
			<Disclaimer>
				<Title>linkr</Title>
				<Description>
          save, share and discover the best links on the web
				</Description>
			</Disclaimer>
			<Form >
				<Input 
					loading={loading ? 1 : 0}
					type='email'
					placeholder='e-mail'
					onChange={(e) => setEmail(e.target.value)}
					onKeyUp={(key) => loginOnEnter(key.nativeEvent.key)}
					value={email}
				/>
				<Input
					loading={loading ? 1 : 0}
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)} value={password}
					onKeyUp={(key) => loginOnEnter(key.nativeEvent.key)}
				/>
				<Input
					loading={loading ? 1 : 0}
					type='text'
					placeholder='name'
					onChange={(e) => setName(e.target.value)}
					onKeyUp={(key) => loginOnEnter(key.nativeEvent.key)}
					value={name}
				/>
				<Input
					loading={loading ? 1 : 0}
					type='url'
					placeholder='picture url'
					onChange={(e) => setImgUrl(e.target.value)}
					onKeyUp={(key) => loginOnEnter(key.nativeEvent.key)}
					value={imgUrl}
				/>
				{!loading ?
					<Button type='submit' loading={loading ? 1 : 0} onClick={validateInputs}>
						Sign Up
					</Button>
					:
					<Button type='submit' loading={loading ? 1 : 0} onClick={validateInputs}>
						<Loader
							type="ThreeDots"
							color="#FFFFFF"
							height={50}
							width={50}
						/>
					</Button>
				}

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
		max-width: 442px;
		width: 80%;
    
    @media(max-width: 600px) {
			font-size: 23px;
			text-align: center;
			width: unset;
			max-width: 240px;
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
		p {
			text-align: center;
		}
`;

const Input = styled.input`
    width: 80%;
    height: 65px;
    background: #FFFFFF;
    color: #9F9F9F;
    border-radius: 6px;
    margin-bottom: 13px;
    padding-left: 12px;
    pointer-events: ${props => props.loading ? 'none' : 'all'};
    font-size: 20px;
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