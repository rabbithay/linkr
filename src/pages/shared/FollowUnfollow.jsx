import styled from 'styled-components';
import React, { useEffect, useState } from 'react';


export default function FollowUnfollow(){
	const [content, setContent] = useState('carregando...');

	const toggleFollowStatus = () => {
		if(content === 'Follow'){
			setContent('Unfollow');
		}else{
			setContent('Follow');
		}
	};

	useEffect(()=>{
		setContent('Follow');
	},[]);



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