import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'

const buildOptinsChart = (series, categorias) => {
    return {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Resultados Preliminares 2024',

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
        xAxis: {
            categories: categorias,
            title: {
                text: null
            },
            gridLineWidth: 1,
            lineWidth: 0
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Elecciones 2024',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            gridLineWidth: 0
        },
        colors: ['#622432', '#FA1201', '#1D42FA', '#FA7500', '#80c7fd',],
        plotOptions: {
            bar: {
                borderRadius: '50%',
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            },
            series: {
                colorByPoint: true
            }
        },
        // legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'top',
        //     x: -40,
        //     y: 80,
        //     floating: true,
        //     borderWidth: 1,
        //     backgroundColor:
        //         Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        //     shadow: true
        // },
        credits: {
            enabled: false
        },
        series: {...series}
    }
}
const Barchart = ({series , categorias}) => {
        return (

            <HighchartsReact
                highcharts={Highcharts}
                options={buildOptinsChart(series, categorias)}
            />
        );
      }
export default Barchart