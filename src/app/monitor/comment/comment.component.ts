import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

declare var $: any;

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    public category;
    public selected;
    public bands;
    public comment_count;
    public sentiment;
    public count_dimension;
    public sentiment_dimension;
    public hotkey;
    public top10_topic;

    constructor(public commentService: CommentService) {}

    ngOnInit() {
        this.loadData();
        this.initTagCloud();
    }

    public changeSelect() {
        for (var i = 0; i < this.category.length; ++i) {
            if (this.category[i].name === this.selected) {
                this.bands = this.category[i].band;
                break;
            }
        }
    }

    public selectBand(value) {
        console.log("eee", value);
    }

    public loadData() {
        //获取品类列表
        this.commentService.getCommentData("category").subscribe(category => {
            this.category = category;
            this.selected = this.category[0].name;
            this.bands = this.category[0].band;
            console.log("sas", this.selected);
            console.log("category", this.category);
        },
        err => {
            console.log(err);
        });

        //获取评论量趋势
        this.commentService.getCommentData("comment_count").subscribe(comment_count => {
            this.comment_count = comment_count;
            console.log("comment_count",this.comment_count);
        },
        err => {
            console.log(err);
        });

        //获取情感趋势
        this.commentService.getCommentData("sentiment").subscribe(sentiment => {
            this.sentiment = sentiment;
            console.log("sentiment", this.sentiment);
        },
        err => {
            console.log(err);
        });

        //获取维度评论量
        this.commentService.getCommentData("count_dimension").subscribe(count_dimension => {
            this.count_dimension = count_dimension;
            console.log("count_dimension", this.count_dimension);
        },
        err => {
            console.log(err);
        });

        //获取维度情感指数
        this.commentService.getCommentData("sentiment_dimension").subscribe(sentiment_dimension => {
            this.sentiment_dimension = sentiment_dimension;
            console.log("sentiment_dimension", this.sentiment_dimension);
        },
        err => {
            console.log(err);
        });

        //获取评论热词
        this.commentService.getCommentData("hotkey").subscribe(hotkey => {
            this.hotkey = hotkey;
            console.log("hotkey", this.hotkey);
        },
        err => {
            console.log(err);
        });

        //获取Top10评论话题
        this.commentService.getCommentData("top10_topic").subscribe(top10_topic => {
            this.top10_topic = top10_topic;
            console.log("top10_topic", this.top10_topic);
        },
        err => {
            console.log(err);
        });
    }

    public commentChartOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        }, {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        }, {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        }, {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        }, {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }]
    };

    public emotionChartOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        }, {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        }, {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        }, {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        }, {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }]
    };

    public commentRadarChartOption = {
        tooltip: {},
        legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '销售（sales）', max: 6500 },
                { name: '管理（Administration）', max: 16000 },
                { name: '信息技术（Information Techology）', max: 30000 },
                { name: '客服（Customer Support）', max: 38000 },
                { name: '研发（Development）', max: 52000 },
                { name: '市场（Marketing）', max: 25000 }
            ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
            }, {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
            }]
        }]
    };

    public emotionRadarChartOption = {
        tooltip: {},
        legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '销售（sales）', max: 6500 },
                { name: '管理（Administration）', max: 16000 },
                { name: '信息技术（Information Techology）', max: 30000 },
                { name: '客服（Customer Support）', max: 38000 },
                { name: '研发（Development）', max: 52000 },
                { name: '市场（Marketing）', max: 25000 }
            ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
            }, {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
            }]
        }]
    };

    public data = [
            ['广州', 20, 100],
            ['浙江', 20, 123],
            ['江苏', 25, 222],
            ['北京', 8, 111],
            ['上海', 7, 111],
            ['河南', 6, 111],
            ['河北', 5, 111],
            ['四川', 5, 111],
            ['安徽', 5, 111],
            ['湖北', 5, 111],
            ['福建', 4, 111],
            ['辽宁', 4, 111],
            ['湖南', 3, 111],
            ['陕西', 3, 111],
            ['广西', 3, 111],
            ['江西', 3, 111],
            ['重庆', 3, 111],
            ['天津', 3, 111],
            ['云南', 2, 111],
            ['山西', 2, 111],
            ['黑龙江', 2, 111],
            ['吉林', 2, 111],
            ['内蒙古', 2, 111],
            ['贵州', 2, 111],
            ['甘肃', 2, 111],
            ['海南', 2, 111],
            ['宁夏', 2, 111],
            ['青海', 1, 111],
            ['西藏', 1, 111],
            ['香港', 1, 111],
            ['未知', 1, 111],
            ['台湾', 1, 111]
        ];

    

    public initTagCloud() {
        var string_ = "";
        for (var i = 0; i < this.data.length; i++) {
            var string_f = this.data[i][0];
            var string_n = this.data[i][1];
            string_ += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list'}},";
        }

        $(function() {
            $("#tag_cloud_1").jQCloud(word_list);
            $("#tag_cloud_2").jQCloud(word_list);
        });
        var string_list = string_;
        var word_list = eval("[" + string_list + "]");
    }

}
