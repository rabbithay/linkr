import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import FollowsContext from '../../contexts/FollowsContext';

export default function FollowUnfollow({someonesId}){
	const [content, setContent] = useState('carregando...');
	const {peopleIFollow} = useContext(FollowsContext);

	const toggleFollowStatus = () => {
		if(content === 'Follow'){
			setContent('Unfollow');
		}else{
			setContent('Follow');
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
		<StyledButton onClick={toggleFollowStatus} content={content}>
			{content}
		</StyledButton>
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
`;