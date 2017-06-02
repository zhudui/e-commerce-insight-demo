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

    private parseLineChartXYAxisData(data, brand, attr) {
        var list = [];
        for (var i = 0; i < data.length; ++i) {
            if (data[i].brand === brand) {
                list = data[i].list;
                break;
            }
        }
        var result = [];
        for (var i = 0; i < list.length; ++i) {
            result[i] = list[i][attr];
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
        let xAxisData = this.parseLineChartXYAxisData(this.data, this.data[0].brand, "key");
        console.log("xAxisData", xAxisData);
        let legendData = this.legend;
        console.log("legendData", legendData);
        var series = [];
        series = this.getLineChartSeriesData(legendData, this.data, "value");
        
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
