/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import HashtagTrending from '../shared/HashtagTrending';
import UserContext from '../../contexts/UserContext';
import { getHashtagPosts } from '../../service/service.hashtag';

export default function Hashtag(){

	return (
		<>
			<HeaderTest />

			<MainBodyTest>
				
					<PostContainerTest >
					</PostContainerTest>;

				<HashtagTrending />
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

const PostContainerTest = styled.div`
	width: 661px;
	height: 276px;
`;

/* eslint-enable */

