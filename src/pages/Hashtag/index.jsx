import React from 'react';
import styled from 'styled-components';
import HashtagSidebar from '../shared/HashtagSidebar';


export default function Hashtag(){
	return(
		<>
			<HeaderTest />

			<MainBodyTest>
				<HashtagSidebar />
			</MainBodyTest>
		</>
	);
}


const HeaderTest = styled.header`
	width: 100%;
	height: 72px;
	background-color: #151515;
`;

const MainBodyTest = styled.div`
	width: 100%;
	height: calc(100vh - 72px);
	background-color: #333333;
`;
