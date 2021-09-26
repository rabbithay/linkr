import React from 'react';
import { ChevronUpCircleSharp } from 'react-ionicons';
import styled from 'styled-components';

export default function ScrollTopButton () {

	
	return (
		<ScrollButton onClick={()=>window.scrollTo(0,0)}>
			<ChevronUpCircleSharp
				color={'#ffffff7f'} 
				height="4rem"
				width="4rem"
			/>
		</ScrollButton>		
	);
}

const ScrollButton = styled.div `
	position: fixed;
	bottom: 40px;
	right: 20px;
	z-index: 5;
	cursor: pointer;

	@media (max-width: 611px){
		display: none;
	}

`;
