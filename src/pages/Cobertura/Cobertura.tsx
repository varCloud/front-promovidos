import React, { useLayoutEffect } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import geojson from "./seccion_cp_morelia_map.json";
highchartsMap(Highcharts);

const states = Highcharts.geojson(geojson, 'map');

const secciones = [
    {
        seccion: 1051,
        value: 438
    },
    {
        seccion: 1179,
        value: 438
    },
    {
        seccion: 1004,
        value: 438
    },
    {
        seccion: 1049,
        value: 438
    },
    {
        seccion: 1131,
        value: 438
    }
]

states.forEach((state) => {
        const seccion = secciones.find((item) => item.seccion == state.properties?.extras?.SECCION)
        if (seccion) {

        state.states = {
            hover: { color: "#ff2e00" }
        }
        state.color =  "#ff4d26"
        state.properties.extras.value = seccion.value
    }
})


const mapOptions = {
    title: {
        text: 'Mapa de morelia por secciones segun el INE',
        align: 'left'
    },
    subtitle: {
        text: 'Puedes revisar el avance de los promovidos por secciones',
        align: 'left'
    },

    accessibility: {
        point: {
            valueDescriptionFormat: '{xDescription}, {point.value} people per square kilometer.'
        },
        description: 'Mapa de Morelia seccionado'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    series: [{
        name: '<b> Secciones y Colonias </b>',

        data: states,
        color: Highcharts.color(Highcharts.getOptions().colors[4])
            .setOpacity(0.75)
            .get(),
        states: {
            hover: {
                color: Highcharts.getOptions().colors[4]
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.properties.extras.SECCION}',
            style: {
                width: '80px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textOutline: 'none',
                color: 'black'
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: `<b>Promovidos: {point.properties.extras.value}</b>
                          <br/>Seccion:  <b>{point.properties.extras.SECCION} </b>
                          <br/> Colonia:  <b>{point.properties.extras.NOMBRE DE COLONIA}</b>
                          <br/> C.P.:  <b>{point.properties.d_cp}</b>
                          <br/> Clasificación:  <b>{point.properties.extras.CLASIFICACION}</b>
                          `
        },
    },]

}

const Cobertura = () => {

    return (
        <>
            <div>
                <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={mapOptions}
                />
            </div>
        </>
    )
}


export default Cobertura;