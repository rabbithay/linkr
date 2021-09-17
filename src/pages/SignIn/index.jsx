import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import ModalAlert from '../shared/ModalAlert';
import Loader from 'react-loader-spinner';


import { signInAPI } from '../../service/service.auth';
import UserContext from '../../contexts/UserContext';


function SignIn(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const {setUserInfo} = useContext(UserContext);
	const ruleRegexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	const throwSwalError = (text) => {
		const modalObj = 
		{
			icon: 'error',
			title: 'Algo deu errado...',
			description: text
		};
		ModalAlert(modalObj);
	};

	const regex = (str, rule) => {
		return (rule.test(str));
	};

	const validateInputs = () => {
		if (email.length === 0 || password.length === 0) {
			throwSwalError('Você deve preencher todos os campos');
			return;
		}

		if (!regex(email, ruleRegexEmail)) {
			throwSwalError('Insira um e-mail válido');
		}
		else {
			handleResponseFromAPI();
		}
	};
    
	const handleResponseFromAPI = () => {
		setLoading(true);
		signInAPI(email, password)
			.then((response) => {
				let userInfo =  
				{
					token: response.data.token,
					userImg: response.data.user.avatar,
					userId: response.data.user.id,
					userName: response.data.user.username
				};
				setUserInfo(userInfo);

				userInfo = JSON.stringify(userInfo);
				localStorage.setItem('userInfo', userInfo);
				
				history.push('/timeline');
			})
			.catch(() => {
				throwSwalError('Email/senha incorretos');
				setLoading(false);
			});
	};

	return(
		<SignInPage>
			<Disclaimer>
				<Title>linkr</Title>
				<Description>
                    save, share and discover<br />the best links on the web
				</Description>
			</Disclaimer>
			<Form >
				<Input 
					loading={loading ? 1 : 0}
					type='email'
					placeholder='e-mail'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<Input
					loading={loading ? 1 : 0}
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)} value={password}
				/>

				{!loading ? 
					<Button type='submit' loading={loading ? 1 : 0} onClick={validateInputs}>
						Sign In
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

				<Link to='/sign-up'>
					<P>First time? Create an account!</P>
				</Link>
			</Form>
		</SignInPage>
	);
}

const SignInPage = styled.div`
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

export default SignIn;