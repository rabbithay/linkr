import React from 'react';
// import { useContext, useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import UserContext from '../../contexts/UserContext';
import { getHashtagTrending } from '../../service/service.hashtag';


export default function HashtagTrending(){
	// const { token } = useContext(UserContext);
	const token = '2fda8a6a-af82-4c24-bd50-398c830636d8';
	const [hashtagList, setHashtagList] = useState([{id: '', name: ''}]);

	useEffect(() => {
		getHashtagTrending(token)
			.then(({ data: { hashtags }}) => setHashtagList(hashtags))
			.catch(({ response }) => {
				alert('Deu ruim com a hashtagTrending menor :\'(');
				console.log({response});  // TODO: Tirar depois e colocar modal
			});

	}, []);


	const makeShortHashtag = (str) => {
		// TODO: Não tem algum jeito melhor de fazer esse tratamento?
		const maxLength = 15;

		const shortStr = str.length > maxLength
			? `${str.slice(0, maxLength-1)}...`
			: str;
		
		return shortStr;
	};


	return(
		<Container>
			<div className='Title'>
				<h1>trending</h1>
			</div>

			<ul className='HashtagsBox'>
				{hashtagList.map(({ id, name }) => {
					return (
						<Link key={id} to={`/hashtag/${id}`}>
							<li>{`# ${makeShortHashtag(name)}`}</li>
						</Link>
					);
				})}

				{/* <Link to='/hashtag'>
					<li># hey1</li>
				</Link>
				<li># 0123456789101214</li>
				<li># AAAAAAAAAAAAAAAA...</li>
				<li># {makeShortHashtag('AAAAAAAAAAAAAAAAAAAAAAa')}</li>
				<li># {makeShortHashtag('OOOOOOOOOOOOOOOOOOOOOOO')}</li>
				<li># hey5</li>
				<li># hey6</li>
				<li># hey7</li>
				<li># hey8</li> */}
			</ul>
			
		</Container>
	);
}


const Container = styled.div`
	position: fixed;
	width: 301px;
	height: 406px;
	right: 18.2%;
	bottom: 20%;
	background-color: #171717;
	border-radius: 16px;

	.Title {
		padding-left: 16px;
		height: 15%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #484848;

		h1 {
			font-family: Oswald;
			color: #FFFFFF;
			font-weight: bold;
			font-size: 27px;
			line-height: 40px;
		}
	}

	.HashtagsBox {
		width: 100%;
		height: 85%;
		padding: 22px 16px 30px;

		li {
			font-family: Lato;
			font-style: normal;
			font-weight: bold;
			font-size: 19px;
			line-height: 29px;
			letter-spacing: 0.05em;
			color: #FFFFFF;
		}
	}

	
`;
