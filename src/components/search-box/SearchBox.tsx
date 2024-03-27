import { useEffect } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import SelectReact from "../form/SelectReact";

const SearchBox = () => {
    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: 'AIzaSyA5UAQss-NXqBs15mjjGp_Iyl69OMEZr6M',
    });

    useEffect(() => {
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length)
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                },
                (placeDetails) => savePlaceDetailsToState(placeDetails)
            );
    }, [placePredictions]);

    const savePlaceDetailsToState = (placeDetails) => {
        console.log(`placeDetails`, placeDetails)
    }

    const renderItem = (item) => {
        console.log(JSON.stringify(item))
        return (
            <li>{item.description}</li>
        )
    }
    return (
        <>
            {/* <SelectReact
                options={placePredictions.map((item) => { return { value: JSON.stringify(item), label: JSON.stringify(item) } })}
                id='idPromotor'                
                name='idPromotor'
                onChange={(evt) => {
                    getPlacePredictions({ input: JSON.stringify(evt) });
                }}
            /> */}
             <input
                placeholder="Debounce 500 ms"
                onChange={(evt) => {
                    getPlacePredictions({ input: evt.target.value });
                }}
            //loading={isPlacePredictionsLoading}
            />
            {placePredictions.map((item) => renderItem(item))} 
        </>
    );
};

export default SearchBox;