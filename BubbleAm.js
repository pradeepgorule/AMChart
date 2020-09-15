import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class BubbleAm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        am4core.useTheme(am4themes_animated);

        var yearData = {};
        var firstYear = 1950;
        var lastYear = 2020;

        for (var year = firstYear; year < lastYear; year++) {
            var data = []
            yearData[year] = data;

            for (var i = 0; i < 50; i++) {
                if (year == firstYear) {
                    data.push({ x: Math.round(Math.random() * 180 - 90), y: Math.round(Math.random() * 140 - 70), radius: Math.round(Math.random() * 1000) });
                }
                else {
                    var previous = yearData[year - 1][i];
                    data.push({ x: previous.x + Math.round(Math.random() * 8 - 4), y: previous.y + Math.round(Math.random() * 8 - 4), radius: Math.abs(previous.radius + Math.round(Math.random() * 200 - 100)) });
                }
            }
        }
        // Create chart instance
        var chart = am4core.create(this.props.chartId, am4charts.XYChart);
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "zoomXY";

        // Create axes
        var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
        xAxis.min = -100;
        xAxis.max = 100;
        xAxis.keepSelection = true;
        xAxis.renderer.grid.template.above = true;

        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = -100;
        yAxis.max = 100;
        yAxis.keepSelection = true;
        yAxis.renderer.grid.template.above = true;

        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueX = "ax";
        series1.dataFields.valueY = "ay";
        series1.strokeOpacity = 0;
        series1.fillOpacity = 1;
        series1.ignoreMinMax = true;
        series1.fill = am4core.color("#e3853c");
        series1.data = [{
            "ax": -1000,
            "ay": 0
        }, {
            "ax": 0,
            "ay": 0
        }, {
            "ax": 0,
            "ay": 1000
        }, {
            "ax": -1000,
            "ay": 1000
        }]
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueX = "ax";
        series2.dataFields.valueY = "ay";
        series2.strokeOpacity = 0;
        series2.ignoreMinMax = true;
        series2.fill = am4core.color("#48b2b7");
        series2.fillOpacity = 0.9;
        series2.data = [{
            "ax": -1000,
            "ay": 0
        }, {
            "ax": 0,
            "ay": 0
        }, {
            "ax": 0,
            "ay": -1000
        }, {
            "ax": -1000,
            "ay": -1000
        }]

        // bottom right
        var series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueX = "ax";
        series3.dataFields.valueY = "ay";
        series3.strokeOpacity = 0;
        series3.fill = am4core.color("#91d1da");
        series3.ignoreMinMax = true;
        series3.fillOpacity = 0.9;
        series3.data = [{
            "ax": 1000,
            "ay": 0
        }, {
            "ax": 0,
            "ay": 0
        }, {
            "ax": 0,
            "ay": -1000
        }, {
            "ax": 1000,
            "ay": -1000
        }]

        // top right
        var series4 = chart.series.push(new am4charts.LineSeries());
        series4.dataFields.valueX = "ax";
        series4.dataFields.valueY = "ay";
        series4.strokeOpacity = 0;
        series4.fill = am4core.color("#e8c634");
        series4.ignoreMinMax = true;
        series4.fillOpacity = 0.9
        series4.data = [{
            "ax": 1000,
            "ay": 0
        }, {
            "ax": 0,
            "ay": 0
        }, {
            "ax": 0,
            "ay": 1000
        }, {
            "ax": 1000,
            "ay": 1000
        }]


        // bubble series

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueX = "x";
        series.dataFields.valueY = "y";
        series.dataFields.value = "radius";
        series.strokeOpacity = 0;


        var bullet = series.bullets.push(new am4core.Circle());
        bullet.fill = am4core.color("#000000");
        bullet.strokeOpacity = 0;
        bullet.strokeWidth = 2;
        bullet.fillOpacity = 0.5;
        bullet.stroke = am4core.color("#ffffff");
        bullet.hiddenState.properties.opacity = 0;
        bullet.tooltipText = "value:{value.value} x:{valueX.value} y:{valueY.value}";


        bullet.events.on("over", function (event) {
            var target = event.target;
            chart.cursor.triggerMove({ x: target.pixelX, y: target.pixelY }, "hard");
            chart.cursor.lineX.y = target.pixelY;
            chart.cursor.lineY.x = target.pixelX - chart.plotContainer.pixelWidth;
            xAxis.tooltip.disabled = false;
            yAxis.tooltip.disabled = false;
        })

        bullet.events.on("out", function (event) {
            chart.cursor.triggerMove(event.pointer.point, "none");
            chart.cursor.lineX.y = 0;
            chart.cursor.lineY.x = 0;
            xAxis.tooltip.disabled = true;
            yAxis.tooltip.disabled = true;
        })

        series.heatRules.push({ target: bullet, min: 2, max: 30, property: "radius" });
        series.data = yearData[firstYear];

        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();


        var label = chart.plotContainer.createChild(am4core.Label)
        label.fontSize = 60;
        label.fillOpacity = 0.4;
        label.align = "center";
        label.zIndex = 1000;


        var sliderContainer = chart.bottomAxesContainer.createChild(am4core.Container);
        sliderContainer.width = am4core.percent(100);
        sliderContainer.layout = "horizontal";


        var playButton = sliderContainer.createChild(am4core.PlayButton);
        playButton.valign = "middle";
        playButton.events.on("toggled", function (event) {
            if (event.target.isActive) {
                playSlider();
            }
            else {
                stopSlider();
            }
        })

        var slider = sliderContainer.createChild(am4core.Slider);
        slider.valign = "middle";
        slider.margin(0, 0, 0, 0);
        slider.marginLeft = 30;
        slider.height = 15;

       // slider.startGrip.events.on("drag", stop);


        var sliderAnimation = slider.animate({ property: "start", to: 1 }, 80000, am4core.ease.linear).pause();
        sliderAnimation.events.on("animationended", function () {
            playButton.isActive = false;
        })

        slider.events.on("rangechanged", function () {
            var year = firstYear + Math.round(slider.start * (lastYear - firstYear - 1));
            var data = yearData[year];
            for (var i = 0; i < series.data.length; i++) {
                var dataContext = series.data[i];
                dataContext.x = data[i].x;
                dataContext.y = data[i].y;
                dataContext.radius = data[i].radius;
            }

            chart.invalidateRawData();

            label.text = year.toString();
        })
       function playSlider() {
            if (slider) {
              if (slider.start >= 1) {
                slider.start = 0;
                sliderAnimation.start();
              }
          
              sliderAnimation.setProgress(slider.start);
          
              sliderAnimation.resume();
              playButton.isActive = true;
            }
          }

          function stopSlider() {
            sliderAnimation.pause();
            playButton.isActive = false;
          }
          
          setTimeout(function() {
            playSlider()
          }, 2000);
    }
    
    render() {
        return (
            <div id={this.props.chartId} style={{height:"400px"}}></div>);
    }
}

export default BubbleAm;