import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import imgCasilla from '../../Cobertura/imgs/casilla.png'
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
            borderWidth: 3,    
        },
        subtitle: {
            text:''
        },
        xAxis: {
            categories:categorias,
            // labels:{
            //     useHTML: true,
            //     padding:10,
            //     height:10,
            //     width:10,
            //     formatter: function(){
            //         return '<img src="https://fastly.picsum.photos/id/781/200/300.jpg?hmac=BPGlXlV8K6X2z4SJCt86Qh1io6ezZBBdynv-QiXwLro"  style="width:20px"></img>';                        
            //     }
            // }
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
        colors: [ '#FA7500' ,'#1D42FA', '#FA1201',  '#622432', '#80c7fd' , '#ec4da9' ],
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
    console.log(categorias)
        return (

            <HighchartsReact
                highcharts={Highcharts}
                options={buildOptinsChart(series, categorias)}
            />
        );
      }
export default Barchart