import { useAdvancedMarkerRef, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import React, { useState } from 'react'


const MarkerWithInfoWindow = ({ latLng, info , colorMarker }) => {
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

    console.log(colorMarker)
    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={{
                    ...latLng
                }}

            >
                <Pin
                    background={colorMarker.background}
                    borderColor={colorMarker.borderColor}
                    glyphColor={colorMarker.glyphColor}></Pin>
            </AdvancedMarker>
            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfowindowOpen(false)}>
                    Nombre : {info}
                </InfoWindow>
            )}

        </>
    );
};

export default MarkerWithInfoWindow