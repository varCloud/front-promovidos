import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import React from 'react'

const _colors = ['#622432', '#FA1201', '#1D42FA', '#FA7500', '#80c7fd',]
const buildOptinsChart = (series , titulo , colors = _colors) => {
    return {
        chart: {
            type: 'pie'
        },
        title: {
            text: titulo,

        },
        tooltip: {
            valueSuffix: '',
            formatter: function() {
                return `<h2> Cantidad total:  <b>${this.y}</b> </h2>`;
            },
            backgroundColor: '#FCFFC5',
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 3
        },
        subtitle: {
            text:''
        },
        colors: colors,
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}',
                    style: {
                        fontSize: '15px',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 1
                    }
                }]
            }
        },
        series: {...series}
    }
}

const PieChart = ({ series , titulo , colores = _colors}) => {
    return (

            <HighchartsReact
                highcharts={Highcharts}
                options={buildOptinsChart(series, titulo, colores)}
            />

    )
}

export default PieChart