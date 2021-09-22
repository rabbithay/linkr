import React from 'react';
import styled from 'styled-components';
import { Pencil, TrashOutline } from 'react-ionicons';
import { useEffect } from 'react';

export default function WrapperDeleteAndEdit ({edit, setEdit, deletePost}) {
	return (
		<WrapperOptions>
			<Pencil 
				onClick={() => {
					edit ? setEdit(false) : setEdit(true);
				}}
				color={'#ffffff'} 
				height="20px"
				width="20px"
				style={{
					cursor: 'pointer'
				}}
			/>
			<TrashOutline
				onClick = {deletePost}
				color={'#ffffff'} 
				height="20px"
				width="20px"
				style={{
					cursor: 'pointer'
				}}
			/>
		</WrapperOptions>
	);
}


const InsertEditInput = ({editPostText, setEditPostText, editRef, handleEditMode, loading}) => {
	useEffect(() => {
		editRef.current.focus();
	}, []);

	return (
		<InputEdit 
			value={editPostText}
			onChange={(e) => setEditPostText(e.target.value)}
			onKeyUp={(key) => handleEditMode(key.nativeEvent.key)}
			ref={editRef}
			loading={loading ? 1 : 0}
		/> 
	);	
};

export {
	InsertEditInput
};







const WrapperOptions = styled.div`
	width: 60px;
	height: 20px;
	display: flex;
	justify-content: space-around;
	position: absolute;
	top: 18px;
	right: 15px;

	@media (max-width: 600px) {
		top: 10px;
		right: 10px;
	}
`;


const InputEdit = styled.textarea`
	width: 100%;
	background: #FFFFFF;
	color: #4C4C4C;
	word-break: break-all;
	resize: none;
	padding: 8px;
	height: 100px;
	margin-bottom: 14px;
	border-radius: 7px;
	font-family: 'Lato';
	font-size: 14px;
	line-height: 17px;
	pointer-events: ${props => props.loading ? 'none' : 'all'};
	
	:focus {
		outline: none;
	}
	
	@media (min-width: 600px) {
		::-webkit-scrollbar {
			width: 5px;
		}
		::-webkit-scrollbar-track {
			background: #f1f1f1; 
			border-radius: 5px;
		}
		::-webkit-scrollbar-thumb {
			background: #888; 
			border-radius: 5px;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #555; 
		}
	}

	@media (max-width: 600px) {
		font-size: 11px;
		line-height: 13px;
	}
`;