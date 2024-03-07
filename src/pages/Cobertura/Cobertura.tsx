import React, { useLayoutEffect } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import proj4 from "proj4";
// import mapDataIE from "@highcharts/map-collection/countries/ie/ie-all.geo.json";
import geojson from "./morelia.maps.json";
highchartsMap(Highcharts);


const mapOptions = {
    chart: {
        map: geojson
    },

    title: {
        text: 'GeoJSON in Highmaps'
    },


    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        tickPixelInterval: 100
    },

}

const Cobertura = () => {

    // useLayoutEffect(() => {
    //     let root = am5.Root.new("chartdiv");

    //     root.setThemes([
    //         am5themes_Animated.new(root)
    //     ]);

    //     root.setThemes([am5themes_Animated.new(root)]);

    //     var chart = root.container.children.push(am5map.MapChart.new(root, {}));

    //     var polygonSeries = chart.series.push(
    //         am5map.MapPolygonSeries.new(root, {
    //             geoJSON:geojson,
    //             exclude: ["AQ"]
    //         })
    //     );

    //     var bubbleSeries = chart.series.push(
    //         am5map.MapPointSeries.new(root, {
    //             valueField: "value",
    //             calculateAggregates: true,
    //             polygonIdField: "id"
    //         })
    //     );

    //     var circleTemplate = am5.Template.new({});

    //     bubbleSeries.bullets.push(function (root, series, dataItem) {
    //         var container = am5.Container.new(root, {});

    //         var circle = container.children.push(
    //             am5.Circle.new(root, {
    //                 radius: 20,
    //                 fillOpacity: 0.7,
    //                 fill: am5.color(0xff0000),
    //                 cursorOverStyle: "pointer",
    //                 tooltipText: `{name}: [bold]{value}[/]`
    //             }, circleTemplate)
    //         );

    //         var countryLabel = container.children.push(
    //             am5.Label.new(root, {
    //                 text: "{name}",
    //                 paddingLeft: 5,
    //                 populateText: true,
    //                 fontWeight: "bold",
    //                 fontSize: 13,
    //                 centerY: am5.p50
    //             })
    //         );

    //         circle.on("radius", function (radius) {
    //             countryLabel.set("x", radius);
    //         })

    //         return am5.Bullet.new(root, {
    //             sprite: container,
    //             dynamic: true
    //         });
    //     });

    //     bubbleSeries.bullets.push(function (root, series, dataItem) {
    //         return am5.Bullet.new(root, {
    //             sprite: am5.Label.new(root, {
    //                 text: "{value.formatNumber('#.')}",
    //                 fill: am5.color(0xffffff),
    //                 populateText: true,
    //                 centerX: am5.p50,
    //                 centerY: am5.p50,
    //                 textAlign: "center"
    //             }),
    //             dynamic: true
    //         });
    //     });



    //     // minValue and maxValue must be set for the animations to work
    //     bubbleSeries.set("heatRules", [
    //         {
    //             target: circleTemplate,
    //             dataField: "value",
    //             min: 10,
    //             max: 50,
    //             minValue: 0,
    //             maxValue: 100,
    //             key: "radius"
    //         }
    //     ]);

    //     //bubbleSeries.data.setAll(mapDataIE);

    //     return () => {
    //         root.dispose();
    //     };
    // }, []);


    return (
        <>
            {/* <div id="chartdiv" style={{ width: "500px", height: "500px" }}></div>
            <div>
                <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={mapOptions}
                />
            </div> */}
        </>
    )
}


export default Cobertura;