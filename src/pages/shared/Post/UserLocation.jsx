import React from 'react';
import styled from 'styled-components';
import { CloseOutline } from 'react-ionicons';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';

function UserLocation({setViewUserLocation, username, coord}) {
	const position = [coord.latitude, coord.longitude];
	return(
		<PreviewBackground>
			<PreviewContainer>
				<OpenNewTab>
					{`${username}'s location`}
				</OpenNewTab>
					
				<CloseOutline
					onClick={() => setViewUserLocation(false)}
					color={'#FFFFFF'} 
					height="40px"
					width="40px"
					style={{
						position: 'absolute',
						top: '10px',
						right: '15px',
						cursor: 'pointer'
					}}
				/>
				<div>
					<MapContainer 
						center={position} 
						zoom={10}
						scrollWheelZoom={true}
						zoomControl={false}
						attributionControl={false}>

						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={position}></Marker>
					</MapContainer>
				</div>
			</PreviewContainer>
		</PreviewBackground>
	);
}

const PreviewBackground = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	background: #FFFFFFE5;
	padding: 10% 20%;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 600px) {
		padding: 5%;
    }
`;

const PreviewContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #333333;
	border-radius: 30px;
	position: relative;
	
	&& div {
		width: 94%;
		height: 85%;
		position: absolute;
		bottom: 6%;
		left: 3%;
		border-radius: 30px;

		@media (max-width: 600px) {
			bottom: 2%;
			height: 94%;
    	}
	}
`;

const OpenNewTab = styled.span`
	width: 80%;
	color: #FFFFFF;
	position: absolute;
	top: 15px;
	left: 65px;
	font-family: 'Oswald';
	font-weight: 700;
	font-size: 50px;

	@media (max-width: 600px) {
		width: 70%;
		font-size: 30px;
		left: 25px;
	}
`;


export default UserLocation;
