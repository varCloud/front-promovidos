import React, { useEffect, useLayoutEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import proj4 from 'proj4';
import geojson from '../jsonMaps/seccion_cp_morelia_map.json';
import '../style.css';
import Spinner from '../../../components/ui/Spinner';

highchartsMap(Highcharts);

const states = Highcharts.geojson(geojson, 'map');

const buildSeries = (secciones) => {
	states.forEach((state) => {
		const seccion = secciones.find((item) => item.seccion == state.properties?.extras?.SECCION);
		if (seccion) {
			state.states = {
				hover: { color: '#ff2e00' },
			};
			state.color = '#ff4d26';
			state.properties.extras.value = seccion.value;
		}
	});
};

const buildMapOptions = (secciones) => {
	buildSeries(secciones);
	return {
		chart: {
			height: 800,
		},
		title: {
			text: 'Mapa de morelia por secciones segun el INE',
			align: 'left',
		},
		subtitle: {
			text: 'Puedes revisar el avance de los promovidos por secciones',
			align: 'left',
		},

		accessibility: {
			point: {
				valueDescriptionFormat:
					'{xDescription}, {point.value} people per square kilometer.',
			},
			description: 'Mapa de Morelia seccionado',
		},

		mapNavigation: {
			enabled: true,
			buttonOptions: {
				verticalAlign: 'bottom',
			},
		},
		mapView: {
			zoom: 12.0,
		},

		series: [
			{
				name: '<b> Secciones y Colonias </b>',

				data: states,
				color: Highcharts.color(Highcharts.getOptions().colors[4]).setOpacity(0.75).get(),
				states: {
					hover: {
						color: Highcharts.getOptions().colors[4],
					},
				},
				dataLabels: {
					enabled: true,
					format: '{point.properties.extras.SECCION}',
					style: {
						width: '80px',
						textTransform: 'uppercase',
						fontWeight: 'bold',
						textOutline: 'none',
						color: 'black',
					},
				},
				tooltip: {
					headerFormat: '',
					pointFormat: `<b>Promovidos: {point.properties.extras.value}</b>
                          <br/>Seccion:  <b>{point.properties.extras.SECCION} </b>
                          <br/> Colonia:  <b>{point.properties.extras.NOMBRE DE COLONIA}</b>
                          <br/> C.P.:  <b>{point.properties.d_cp}</b>
                          <br/> Clasificación:  <b>{point.properties.extras.CLASIFICACION}</b>
                          `,
				},
			},
		],
	};
};

const MapCobertura = ({ secciones }) => {
	const [seriesCobertura, setSeriesCobertur] = useState<any>();
	useEffect(() => {
		setSeriesCobertur(buildMapOptions(secciones));
		return () => {};
	}, []);

	return (
		<div>
			<HighchartsReact
				constructorType='mapChart'
				highcharts={Highcharts}
				options={seriesCobertura}
			/>
		</div>
	);
};

export default MapCobertura;
