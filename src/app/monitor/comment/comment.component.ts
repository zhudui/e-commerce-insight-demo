import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import * as _ from "lodash";

declare var $: any;

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    public category;
    public comment_count;
    public sentiment;
    public count_dimension;
    public sentiment_dimension;
    public hotkey;
    public top10_topic;

    public commentChartOption;
    public emotionChartOption;
    public commentRadarChartOption;
    public emotionRadarChartOption;
    public selectedBandArray;

    public platforms = ["天猫", "京东", "一号店", "贝贝网"];
    public bands;
    public condition = {
        selectedCategory: null,
        selectedBand: {},
        selectedPlatform: {},
        timeRange: {
            startDate: null,
            endDate: null
        },
        timeGranularity: null
    };

    constructor(public commentService: CommentService) {}

    ngOnInit() {
        this.loadData();
    }

    public changeSelect() {
        for (var i = 0; i < this.category.length; ++i) {
            if (this.category[i].name === this.condition.selectedCategory) {
                this.bands = this.category[i].band;
                break;
            }
        }
    }

    public toggleAllBand(checked) {
        for (var i = 0; i < this.bands.length; ++i) {
            this.condition.selectedBand[this.bands[i].name] = checked;
        }

    }

    public toggleAllPlatform(checked) {
        for (var i = 0; i < this.platforms.length; ++i) {
            this.condition.selectedPlatform[this.platforms[i]] = checked;
        }
    }

    

    public loadData() {
        //获取品类列表
        this.commentService.getCommentData("category").subscribe(category => {
            this.category = category;
            this.condition.selectedCategory = this.category[0].name;
            this.bands = this.category[0].band;
            console.log("category", this.category);
        },
        err => {
            console.log(err);
        });
    }

    public search() {
        this.selectedBandArray = this.getSelectedBand();
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
            this.initTagCloud();
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

    private getSelectedBand() {
        var result = [];
        for (var i = 0; i < this.bands.length; ++i) {
            if (this.condition.selectedBand[this.bands[i].name]) result.push(this.bands[i].name);
        }
        return result;
    }
    

    public initTagCloud() {
        var string_1 = "";
        var string_2 = "";
        if (this.hotkey[0]) {
            for (var i = 0; i < this.hotkey[0].hotkey.length; i++) {
                var string_f = this.hotkey[0].hotkey[i].key;
                var string_n = this.hotkey[0].hotkey[i].weight;
                string_1 += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list'}},";
            }
        }

        if (this.hotkey[1]) {
            for (var i = 0; i < this.hotkey[1].hotkey.length; i++) {
                var string_f = this.hotkey[1].hotkey[i].key;
                var string_n = this.hotkey[1].hotkey[i].weight;
                string_2 += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list'}},";
            }
        }

        $(function() {
            $("#tag_cloud_1").jQCloud(word_list1);
            $("#tag_cloud_2").jQCloud(word_list2);
        });
        var string_list1 = string_1;
        var string_list2 = string_2;
        var word_list1 = eval("[" + string_list1 + "]");
        var word_list2 = eval("[" + string_list2 + "]");
    }

}
