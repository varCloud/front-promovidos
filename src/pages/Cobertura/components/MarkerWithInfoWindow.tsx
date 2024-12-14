import { useAdvancedMarkerRef, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import '../style.css';

const MarkerWithInfoWindow = ({
	latLng,
	info,
	colorMarker,
	backgroundColor = 'transparent',
	ubicacion = undefined,
}) => {
	const [infowindowOpen, setInfowindowOpen] = useState(false);
	const [markerRef, marker] = useAdvancedMarkerRef();

	console.log(colorMarker);
	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={{
					...latLng,
				}}>
				<div
					className='container-casilla'
					style={{
						background: backgroundColor,
					}}>
					<img src={colorMarker.markerIcon} alt='' />
				</div>
			</AdvancedMarker>
			{infowindowOpen && (
				<InfoWindow
					anchor={marker}
					maxWidth={200}
					onCloseClick={() => setInfowindowOpen(false)}>
					Nombre : {info} <br /> <br />
					{ubicacion ? `Tipo:  ${ubicacion}` : null}
				</InfoWindow>
			)}
		</>
	);
};

export default MarkerWithInfoWindow;
