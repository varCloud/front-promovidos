import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React from 'react';

const buildOptinsChart = (series) => {
	return {
		chart: {
			type: 'pie',
		},
		title: {
			text: 'Promovidos por Edades',
		},
		tooltip: {
			valueSuffix: '',
			formatter() {
				return `<h2> Cantidad total:  <b>${this.y}</b> </h2>`;
			},
			backgroundColor: '#FCFFC5',
			borderColor: 'black',
			borderRadius: 10,
			borderWidth: 3,
		},
		subtitle: {
			text: '',
		},
		plotOptions: {
			series: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: [
					{
						enabled: true,
						distance: 20,
					},
					{
						enabled: true,
						distance: -40,
						format: '{point.percentage:.1f}',
						style: {
							fontSize: '15px',
							textOutline: 'none',
							opacity: 0.7,
						},
						filter: {
							operator: '>',
							property: 'percentage',
							value: 1,
						},
					},
				],
			},
		},
		series: { ...series },
	};
};

const GraficoEdades = ({ series }) => {
	return <HighchartsReact highcharts={Highcharts} options={buildOptinsChart(series)} />;
};

export default GraficoEdades;
