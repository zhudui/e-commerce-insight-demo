import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-radar-chart',
    templateUrl: './radar-chart.component.html',
    styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnChanges {
    @Input() legend;
    @Input() data;

    constructor() {}

    public chartOption;

    private parseRadarChartData(data, band, attr) {
        var dimension_list = [];
        for (var i = 0; i < data.length; ++i) {
            if (data[i].band === band) {
                dimension_list = data[i].dimension_list;
                break;
            }
        }
        var result = [];
        for (var i = 0; i < dimension_list.length; ++i) {
            result[i] = dimension_list[i][attr];
        }
        return result;
    }

    

    private getRadarChartSeriesData(legend, data, attr) {
        var result = [];
        for (var i = 0; i < legend.length; ++i) {
            var serie = {
                name: null,
                value: []
            };
            serie.name = legend[i];
            serie.value = this.parseRadarChartData(data, legend[i], attr);
            result.push(serie);
        }
        return result;
    }

    private parseDimension(dimension) {
        var result = [];
        for (var i = 0; i < dimension.length; ++i) {
            var obj = {name: null};
            obj.name = dimension[i];
            result.push(obj);
        }
        return result;
    }

    public initialRadarChart() {
        let dimension = this.parseRadarChartData(this.data, this.data[0].band, "dimension");
        let indicator = this.parseDimension(dimension);
        console.log("radar indicator", indicator);
        let legendData = this.legend;
        console.log("radar legendData", legendData);
        var series = [];
        if (this.data[0] && this.data[0].dimension_list[0] && this.data[0].dimension_list[0].hasOwnProperty("count")) {
            series = this.getRadarChartSeriesData(legendData, this.data, "count");
        } else {
            series = this.getRadarChartSeriesData(legendData, this.data, "rate");
        }

        console.log("radar series", series);

        this.chartOption = {
            tooltip: {},
            legend: {
                data: legendData
            },
            radar: {
                // shape: 'circle',
                indicator: indicator
            },
            series: [{
                type: 'radar',
                // areaStyle: {normal: {}},
                data: series
            }]
        };
    }

    ngOnChanges() {
        if (Array.isArray(this.data) && Array.isArray(this.legend)) {
            this.initialRadarChart();
        }
    }

}
