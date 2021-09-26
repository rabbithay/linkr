import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import FollowsContext from '../../contexts/FollowsContext';
import { postFollow, postUnfollow } from '../../service/service.users';
import ModalAlert from './ModalAlert';

export default function FollowUnfollow({someonesId, token}){
	const [content, setContent] = useState('Loading...');
	const {peopleIFollow, updatePeopleIFollow} = useContext(FollowsContext);

	const toggleFollowStatus = () => {
		setContent('Loading...');
		if (content === 'Follow') {
			postFollow(someonesId, token)
				.then(() => {
					setContent('Unfollow');
					updatePeopleIFollow();
				})
				.catch(() => {
					const modalObj = {
						icon: 'error',
						title: 'An error occurred on trying to follow this user, please, try again later'
					};
					ModalAlert(modalObj);
					setContent('Follow');
				});
		} else {
			postUnfollow(someonesId, token)
				.then(()=>{
					setContent('Follow');
					updatePeopleIFollow();
				})
				.catch(() => {
					const modalObj = {
						icon: 'error',
						title: 'An error occurred on trying to unfollow this user, please, try again later'
					};
					ModalAlert(modalObj);
					setContent('Unfollow');
				});
		}
	};

	useEffect(()=>{
		let peopleIFollowIds = peopleIFollow.map((people)=>people.id);
		if (peopleIFollowIds.includes(Number(someonesId))){
			setContent('Unfollow');
		}else{
			setContent('Follow');
		}
	},[peopleIFollow]);



	return(
		<>
			{content === 'Loading...' ?
				<StyledButton  content={content}>
					{content}
				</StyledButton>
				:
				<StyledButton onClick={toggleFollowStatus} content={content}>
					{content}
				</StyledButton>
			}

		</>
	);
}

const StyledButton = styled.button`
	width: 112px;
	height: 31px;
	background-color: ${props => props.content === 'Follow'? '#1877F2' : '#ffffff' };
	color: ${props => props.content === 'Follow'? '#ffffff' : '#1877F2'};
	border-radius: 5px;
	font-family: 'Lato';
	font-size: 14px;
	font-weight: 700;
	margin: auto;
	cursor: pointer;

	@media (max-width: 611px){
		font-size: 11px;
		height: 16px;
	}
`;
