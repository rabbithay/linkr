import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { ChevronDownOutline, ChevronUpOutline } from 'react-ionicons';


import UserContext from '../../contexts/UserContext';

function Header () {
	const {userInfo} = useContext(UserContext);
	const userProfilePhoto = userInfo.photo;
	const [enabled, setEnabled] = useState(false);

	return (
		<Topbar>
			<P>linkr</P>
			<Container>
				<Dropdown>
					<DropdownButton onClick={() => enabled ? setEnabled(false) : setEnabled(true)}>
						{enabled ? 
							<ChevronDownOutline
								color={'#FFFFFF'} 
								height="20px"
								width="20px"
							/> 
							: 
							<ChevronUpOutline
								color={'#FFFFFF'} 
								height="20px"
								width="20px"
							/>}
					</DropdownButton>

					<DropdownContent enabled={enabled ? 1 : 0}>
						<Link>
							<DropwdownOption>
								My posts
							</DropwdownOption>
						</Link>

						<Link>
							<DropwdownOption>
								My likes
							</DropwdownOption>
						</Link>

						<Link>
							<DropwdownOption>
								Logout
							</DropwdownOption>
						</Link>
					</DropdownContent>
				</Dropdown>

				<ProfilePhoto src={userProfilePhoto} />
			</Container>
		</Topbar>
	);
}

const Topbar = styled.div`
	width: 100%;
	height: 72px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	background-color: #151515;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const P = styled.p`
	font-size: 49px;
	font-weight: bold;
	color: #FFFFFF;
	font-family: 'Passion One';
	padding-left: 30px;

	@media(max-width: 600px) {
        padding-left: 15px;
    }
`;

const Container = styled.div`
	height: 100%;
	width: 150px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: relative;

	@media(max-width: 600px) {
		width: 100px;
		justify-content: center;
    }
`;

const Dropdown = styled.div`
	display: inline-block;
`;

const DropdownButton = styled.button`
	border: none;
	background-color: transparent;
	margin: 0px;
	padding: 0px;
`;

const DropdownContent = styled.div`
	width: 150px;
	height: 90px;
	background-color: #151515;
	border-bottom-left-radius: 20px;
	display: ${props => props.enabled ? 'block' : 'none'};
	position: absolute;
	right: 0;
	top: 100%;
	z-index: 1;

	&& p {
		display: block;
	}
`;

const DropwdownOption = styled.p`
	font-size: 17px;
	font-weight: bold;
	text-align: center;
	margin-top: 8px;
	color: #FFFFFF;
	font-family: 'Lato';
`;

const ProfilePhoto = styled.img`
	width: 53px;
	height: 53px;
	border-radius: 27px;
	margin-left: 10px;

	@media(max-width: 600px) {
        width: 44px;
		height: 44px;
    }
`;

export default Header;