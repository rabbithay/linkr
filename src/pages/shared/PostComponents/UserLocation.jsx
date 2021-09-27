import React from 'react';
import styled from 'styled-components';
import { CloseOutline } from 'react-ionicons';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function UserLocation({setViewUserLocation, username, coord}) {
	const position = [coord.latitude, coord.longitude];
	return(
		<PreviewBackground>
			<PreviewContainer>
				<OpenNewTab>
					<UserName>
						{`${username}'s`}
					</UserName>
					<Location>
						location
					</Location>
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
	z-index: 5;
	background: #FFFFFFE5;
	padding: 10% 20%;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 1025px) {
		padding: 5% 10%;
    }

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
		height: calc(100% - 50px);
		position: absolute;
		top: 40px;
		left: 3%;
		border-radius: 30px;

		@media (max-width: 600px) {
			height: calc(100% - 35px);
			top: 30px
		}
		
		@media (max-width: 350px) {
			height: calc(100% - 30px);
			top: 25px
		}
	}
`;

const OpenNewTab = styled.span`
	width: 80%;
	height: 70px;
	display: flex;
	position: absolute;
	top: 15px;
	left: 6%;
	color: #FFFFFF;
	font-family: 'Oswald';
	font-weight: 700;
	font-size: 50px;

	@media (max-width: 600px) {
		width: 80%;
		font-size: 30px;
		left: 25px;
	}
`;

const UserName = styled.span`
	max-width: 65%;
	color: #FFFFFF;
	font-family: 'Oswald';
	font-weight: 700;
	font-size: 50px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-right: 10px;

	@media (max-width: 600px) {
		max-width: 50%;
		font-size: 30px;
		margin-right: 5px;
	}

	@media (max-width: 350px) {
		font-size: 22px;
	}
`;

const Location = styled.span`
	color: #FFFFFF;
	font-family: 'Oswald';
	font-weight: 700;
	font-size: 50px;

	@media (max-width: 600px) {
		font-size: 30px;
	}

	@media (max-width: 350px) {
		font-size: 22px;
	}
`;

export default UserLocation;
