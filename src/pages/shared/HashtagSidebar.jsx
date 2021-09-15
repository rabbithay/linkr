import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function HashtagSidebar(){
	// Tirar esta informação do servidor
	const hashtagList = {
		'hashtags': [
			{
				'id': 2,
				'name': 'respondeai',
				'numberOfMentions': 1
			},
			{
				'id': 1,
				'name': 'rickroll',
				'numberOfMentions': 1
			}
		]
	};

	const { hashtags } = hashtagList;


	return(
		<Container>
			<div className='Title'>
				<h1>trending</h1>
			</div>

			<ul className='HashtagsBox'>
				{hashtags.map(({ id, name }) => {
					return (
						// Tratar se o # for muito grande (cortar a # e colocar '...')
						<Link key={id} to='/hashtag'>
							<li>{`# ${name}`}</li>
						</Link>
					);
				})}

				<Link to='/hashtag'>
					<li># hey1</li>
				</Link>
				<li># hey2</li>
				<li># hey3</li>
				<li># hey4</li>
				<li># hey5</li>
				<li># hey1</li>
				<li># hey2</li>
				<li># hey3</li>
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
