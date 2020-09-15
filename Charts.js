import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


class Charts extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    // let data = [];
    // let visits = 10;
    // for (let i = 0; i < 5; i++) {
    //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   data.push({ date: new Date(2018, 0, i),  value: visits });
    // }
    var data = [{ date:new Date(2018, 0) , value: "5" }, { date: new Date(2018, 1), value: "6" }, { date: new Date(2018, 3), value: "15" }]
    console.log("data",data);

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    console.log("dateAxis",dateAxis)

   // dateAxis.renderer.grid.template.location = 2;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
   // valueAxis.renderer.minWidth = 50;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    console.log("series",series);
    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();
    //console.log("chart", chart)
    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    // this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default Charts;