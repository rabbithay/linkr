import React from 'react';
import { HeartOutline, HeartSharp } from 'react-ionicons';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { postLikeOrDislike } from '../../service/service.posts';

export default function Like ({liked, setLiked, id, token}) {

	function likeOrDislike(){
		const action = (liked) ? 'dislike' : 'like';
		const config = {headers: 
			{ 'Authorization': `Bearer ${token}` }
		};
		setLiked(!liked);
		postLikeOrDislike(config, id, action).then((res)=>{
			console.log(res);
		}).catch((error)=>{
			console.log(error);
			setLiked(!liked);
		});
	}

	return (
		<LikeContainer data-tip="hello world" onClick={likeOrDislike}>
			{liked 
				?<HeartSharp
					color={'#ef2929'} 
					height="22px"
					width="22px"
				/>
				:<HeartOutline
					color={'#fff'} 
					height="22px"
					width="22px"
				/>
			}
			<ReactTooltip 
				type="light"
				textColor="#505050"
				place="bottom"
				effect="solid"
				border="5"			
			/>
		</LikeContainer>		
	);
}

const LikeContainer = styled.div`
	position: absolute;
	top: 86px;
	left: 33px;
	font-family: "Lato";
`;





