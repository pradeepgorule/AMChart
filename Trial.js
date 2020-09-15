import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Trial extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        let chart = am4core.create(this.props.chartId, am4charts.XYChart);



        var data = [{ date: new Date(2018, 0), value: "5" }, { date: new Date(2018, 1), value: "6" }, { date: new Date(2018, 2), value: "25" }, { date: new Date(2018, 3), value: "30" }, { date: new Date(2018, 4), value: "35" }]
        

        chart.data = data;
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
         
        dateAxis.renderer.labels.template.disabled = true;
        dateAxis.renderer.grid.template.strokeWidth = 0;// disable vertical lines

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        dateAxis.renderer.grid.push(new am4charts.Grid()).disabled = true;
        valueAxis.renderer.grid.push(new am4charts.Grid()).disabled = true;
        valueAxis.renderer.labels.template.disabled = true; // remove yaxis labels


        valueAxis.renderer.grid.template.strokeWidth = 0; //disable horizontal line


        let series = chart.series.push(new am4charts.LineSeries());

        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.strokeWidth = 4;
        series.stroke = am4core.color("#E5E5E5");
        series.fill = am4core.color("#E5E5E5");
        
        series.tooltipText = "{valueY.value}";
         
        // chart.cursor = new am4charts.XYCursor();



        //Adding Bullets 
        var bullet = series.bullets.push(new am4charts.CircleBullet());

        //bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.stroke = am4core.color("#E5E5E5");
        bullet.tooltipText = "Value: [bold]{value}[/]"

        var hoverState = bullet.states.create("hover");
        hoverState.properties.fill = am4core.color("#3DC2C2");
        console.log("prop",hoverState.properties)

   

        


        // showing bullet labels
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{value}";
        labelBullet.label.dy = -10; //display value above the bullet point

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.strokeWidth = 0;
       
        

    }
    render() {
        
        return (<>  <div id={this.props.chartId} style={{ width: "100%", height: "130px", fontSize: "10px" }}></div> </>);
    }
}

export default Trial;