import React , {useState} from 'react';
import { HeartOutline, HeartSharp } from 'react-ionicons';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { postLikeOrDislike } from '../../../service/service.posts';
import ModalAlert from '../ModalAlert';

export default function Like ({ id, userInfo, likes }) {
	const [liked, setLiked] = useState(checkLike());


	function likeOrDislike(){
		const action = (liked) ? 'dislike' : 'like';
		setLiked(!liked);
		postLikeOrDislike(userInfo.token, id, action)
			.then()
			.catch(() => {
				setLiked(!liked);
				const modalObj = {
					icon: 'error',
					title: 'Something went wrong, please, try again later'
				};
				ModalAlert(modalObj);
			});
	}

	function checkLike(){
		return !! likes.find((l) => {
			return l.userId===userInfo.userId;
		});
	}

	const peopleWhoLiked = likes.filter(l=>l.userId !== userInfo.userId).map(l=>l['user.username']);

	function dataTip(){
		if (!peopleWhoLiked.length){
			return (liked) ? 'You' : 'Nobody';
		}
		if (peopleWhoLiked.length === 1){
			return (liked) 
				? 'You and ' + peopleWhoLiked[0]
				: peopleWhoLiked[0];
		}
		if (peopleWhoLiked.length === 2){
			return (liked)
				? `You, ${peopleWhoLiked[0]} and ${peopleWhoLiked[1]}`
				: `${peopleWhoLiked[0]} and ${peopleWhoLiked[1]}`;
		}
		if (peopleWhoLiked.length === 3){
			return (liked)
				? `You, ${peopleWhoLiked[0]} and 2 others`
				: `${peopleWhoLiked[0]}, ${peopleWhoLiked[1]} and ${peopleWhoLiked[2]}`;
		}
		return (liked)
			? `You, ${peopleWhoLiked[0]} and ${peopleWhoLiked.length - 1} others`
			: `${peopleWhoLiked[0]}, ${peopleWhoLiked[1]} and ${peopleWhoLiked.length - 2} others`;
	}
	const text = dataTip();
	
	return (
		<LikeContainer onClick={likeOrDislike}>
			<div data-tip={text} >
				{liked 
					?<HeartSharp
						color={'#ef2929'} 
						height="20px"
						width="20px"
					/>
					:<HeartOutline
						color={'#fff'} 
						height="20px"
						width="20px"
					/>
				}
				<ReactTooltip 
					type="light"
					textColor="#505050"
					place="bottom"
					effect="solid"
				/>
			</div>
			<LikesQntt>{`${(liked) ? peopleWhoLiked.length + 1 : peopleWhoLiked.length} like${peopleWhoLiked.length > 1 || liked && peopleWhoLiked.length + 1 > 1 ? 's' : ''}`}</LikesQntt>
		</LikeContainer>		
	);
}

const LikeContainer = styled.div`
	font-family: "Lato";
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	
	@media (max-width: 600px) {
		left: 12px;
		top: 60px;
	}

`;
const LikesQntt = styled.p`
	color: #fff;
	margin-top: 3px;
	font-size: 11px;
`;




