import React from 'react';
import styled from 'styled-components';
import { SearchSharp } from 'react-ionicons';


export default function SearchBar() {
	return (
		<Container>
			<input type="text" placeholder='Search for people and friends' />

			<IconWrapper>
				<SearchSharp
					color={'#C6C6C6'} 
					height="21px"
					width="21px"
				/>
			</IconWrapper>
		</Container>
	);
}


const Container = styled.form`
	width: 40%;
	height: 45px;
	display: flex;
	/* background-color: red; */
	border-radius: 8px;
	border-width: 0px;

	input {
		width: calc(100% - (21px + 2 * 13px));
		height: 100%;
		padding-left: 17px;
		font-family: Lato;
		font-style: normal;
		font-weight: normal;
		font-size: 19px;
		line-height: 23px;
		color: #C6C6C6;
		background: #FFFFFF;
		border-radius: 8px 0 0 8px;
		border-width: 0px;
		
		::placeholder {
			color: #C6C6C6;
		}
	}
`;

const IconWrapper = styled.div`
	height: 100%;
	width: calc(21px + 2 * 13px);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 13px 0;
	border-radius: 0 8px 8px 0;
	background-color: red;
`;
