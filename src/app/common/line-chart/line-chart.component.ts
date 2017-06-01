import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges {
    @Input() legend;
    @Input() data;

    constructor() {}

    public chartOption = {};

    private parseLineChartXYAxisData(data, band, attr) {
        var dc = [];
        for (var i = 0; i < data.length; ++i) {
            if (data[i].band === band) {
                dc = data[i].dc;
                break;
            }
        }
        var result = [];
        for (var i = 0; i < dc.length; ++i) {
            result[i] = dc[i][attr];
        }
        return result;
    }

    

    private getLineChartSeriesData(legend, data, attr) {
        var result = [];
        for (var i = 0; i < legend.length; ++i) {
            var serie = {
                name: null,
                type: "line",
                data: []
            };
            serie.name = legend[i];
            serie.data = this.parseLineChartXYAxisData(data, legend[i], attr);
            result.push(serie);
        }
        return result;
    }

    

    public initialLineChart() {
        let xAxisData = this.parseLineChartXYAxisData(this.data, this.data[0].band, "date");
        console.log("xAxisData", xAxisData);
        let legendData = this.legend;
        console.log("legendData", legendData);
        var series = [];
        if (this.data[0] && this.data[0].dc[0] && this.data[0].dc[0].hasOwnProperty("count")) {
            series = this.getLineChartSeriesData(legendData, this.data, "count");
        } else {
            series = this.getLineChartSeriesData(legendData, this.data, "rate");
        }
        console.log("series", series);


        this.chartOption = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series: series
        };
    }

    ngOnChanges() {

        if (Array.isArray(this.data) && Array.isArray(this.legend)) {
            this.initialLineChart();
        }
    }

}
