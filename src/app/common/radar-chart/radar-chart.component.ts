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

    private parseRadarChartData(data, brand, attr) {
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
        let dimension = this.parseRadarChartData(this.data, this.data[0].brand, "key");
        let indicator = this.parseDimension(dimension);
        console.log("radar indicator", indicator);
        let legendData = this.legend;
        console.log("radar legendData", legendData);
        var series = [];
        series = this.getRadarChartSeriesData(legendData, this.data, "value");

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
