import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export default function CirclesLoader(){
	return (
		<DisplayFlexCenter>						
			<Loader type="Circles" color="#b7b7b7" height={100} width={100} />
		</DisplayFlexCenter>
	);
}

const DisplayFlexCenter = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 40px;
`;