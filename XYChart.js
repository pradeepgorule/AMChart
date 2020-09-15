import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class XYchart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = [{
            "country": "Lithuania",
            "litres": 501
        }, {
            "country": "Czechia",
            "litres": 301
        }, {
            "country": "Ireland",
            "litres": 201
        }, {
            "country": "Germany",
            "litres": 165
        }, {
            "country": "Australia",
            "litres": 139
        }, {
            "country": "Austria",
            "litres": 128
        }, {
            "country": "UK",
            "litres": 99
        }, {
            "country": "Belgium",
            "litres": 60
        }, {
            "country": "The Netherlands",
            "litres": 50
        }];
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.title.text = "Countries";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Litres sold (M)";
        console.log(valueAxis)


        var series = chart.series.push(new am4charts.ColumnSeries());

        series.dataFields.valueY = "litres";
        series.dataFields.categoryX = "country";

        series.name = "Sales";
        series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
        series.columns.template.fill = am4core.color("#104547"); // fill

    }
    render() {
        return (<>
            <div id="chartdiv" style={{ width: "50%", height: "500px" }}></div>
        </>);
    }
}

export default XYchart;