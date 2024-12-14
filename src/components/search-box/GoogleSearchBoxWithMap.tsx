import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { URIS_CONFIG } from '../../config/uris.config';

const MySwal = withReactContent(Swal);

const GoogleSearchBoxWithMap = ({ height = '500px', handleChangeMarker, direccionToSearch }) => {
	const [value, setValue] = useState(null);
	const [zoom, setZoom] = useState(12);
	const [currentMarker, setCurrentMarker] = useState({ lat: 19.70295, lng: -101.19365 });
	const [propsMapa, setPropsMapa] = useState({ latLngValue: null, _value: null });

	const onchangePlace = async (_value) => {
		console.log(`onchangePlace`);
		setValue(_value);
		const LatLn: google.maps.GeocoderResult[] = await geocodeByPlaceId(_value.value.place_id);
		const latLngValue = {
			lat: LatLn[0].geometry.location.lat() ?? 0,
			lng: LatLn[0].geometry.location.lng() ?? 0,
		};
		setCurrentMarker({ ...latLngValue });
		setPropsMapa({ latLngValue, _value });
		setZoom(20);
		handleChangeMarker({ latLngValue, _value });
	};

	useEffect(() => {}, [direccionToSearch]);

	const onDragEnd = (e) => {
		if (!propsMapa.latLngValue) {
			MySwal.fire({
				title: `Para mover el marcador, es necesario primero buscar una dirección`,
				icon: 'warning',
			});
			setCurrentMarker({ ...currentMarker });
			return;
		}
		const latLngValue = { lat: e.latLng.lat(), lng: e.latLng.lng() };
		setCurrentMarker({ ...latLngValue });
		setPropsMapa({ ...propsMapa, latLngValue });
		handleChangeMarker(propsMapa);
	};

	return (
		<>
			<GooglePlacesAutocomplete
				selectProps={{
					value,
					onChange: onchangePlace,
					placeholder: 'Buscar',
				}}
				apiOptions={{ language: 'es', region: 'mx' }}
				autocompletionRequest={{
					componentRestrictions: {
						country: ['mx'],
					},
				}}
			/>

			<APIProvider apiKey={URIS_CONFIG.GOOGLE_KEY}>
				<Map
					style={{ width: '100%', height }}
					center={{ ...currentMarker }}
					zoom={zoom}
					onZoomChanged={(ev) => setZoom(ev.detail.zoom)}
					gestureHandling='greedy'
					onBoundsChanged={(evt) => {
						console.log(evt);
					}}>
					<Marker
						position={{ ...currentMarker }}
						clickable
						title='clickable google.maps.Marker'
						draggable
						onDragEnd={(e) => {
							onDragEnd(e);
						}}
					/>
				</Map>
			</APIProvider>
		</>
	);
};

export default GoogleSearchBoxWithMap;
