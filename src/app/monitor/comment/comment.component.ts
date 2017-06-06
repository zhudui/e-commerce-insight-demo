import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

import * as _ from "lodash";
import * as moment from 'moment';

declare var $: any;

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    public formErrors = {
        brands: null,
        timeRanges: null,
        granularity: null
    };

    public category;
    public comment_count;
    public sentiment;
    public count_dimension;
    public sentiment_dimension;
    public hotkey;
    public top10_topic;
    public comment_detail;

    public commentChartOption;
    public emotionChartOption;
    public commentRadarChartOption;
    public emotionRadarChartOption;
    public selectedBrandArray = [];

    public tempArray = new Array(5);

    public platforms = ["天猫", "京东", "一号店", "贝贝网"];
    public brands;
    public condition = {
        selectedCategory: null,
        selectedBrand: {},
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
            if (this.category[i].category === this.condition.selectedCategory) {
                this.brands = this.category[i].brands;
                break;
            }
        }
    }

    public toggleAllBrand(checked) {
        for (var i = 0; i < this.brands.length; ++i) {
            this.condition.selectedBrand[this.brands[i].brand] = checked;
        }

    }

    public toggleAllPlatform(checked) {
        for (var i = 0; i < this.platforms.length; ++i) {
            this.condition.selectedPlatform[this.platforms[i]] = checked;
        }
    }

    

    public loadData() {
        //获取品类列表
        this.commentService.getCategory().subscribe(category => {
            this.category = category;
            this.condition.selectedCategory = this.category[0].category;
            this.brands = this.category[0].brands;
        },
        err => {
            console.log(err);
        });
    }

    public search() {
        this.formErrors = {
            brands: null,
            timeRanges: null,
            granularity: null
        };
        this.selectedBrandArray = this.getSelectedBrand();
        if (this.selectedBrandArray.length === 0) {
            this.formErrors.brands = "请至少选择一个品牌";
        }
        if (!this.condition.timeRange.startDate
            || !this.condition.timeRange.endDate 
            || moment(this.condition.timeRange.endDate).format("YYYY-MM-DD") < moment(this.condition.timeRange.startDate).format("YYYY-MM-DD")) {
            this.formErrors.timeRanges = "请输入正确的时间范围";
        }
        if (!this.condition.timeGranularity) {
            this.formErrors.granularity = "请选择时间粒度";
        }

        if (!this.formErrors.brands && !this.formErrors.timeRanges && !this.formErrors.granularity) {
            console.log("form correct");
            let requestCondition = {
                category: this.condition.selectedCategory,
                brands: this.selectedBrandArray,
                bdate: moment(this.condition.timeRange.startDate).format("YYYY-MM-DD"),
                edate: moment(this.condition.timeRange.endDate).format("YYYY-MM-DD"),
                granularity: this.condition.timeGranularity
            };

            console.log("requestData", requestCondition);
            //获取评论量趋势
            this.commentService.getCommentData("comment_count", requestCondition).subscribe(comment_count => {
                this.comment_count = comment_count;
                console.log("comment_count",this.comment_count);            
            },
            err => {
                console.log(err);
            });

            //获取情感趋势
            this.commentService.getCommentData("sentiment", requestCondition).subscribe(sentiment => {
                this.sentiment = sentiment;
                console.log("sentiment", this.sentiment);
            },
            err => {
                console.log(err);
            });

            //获取维度评论量
            this.commentService.getCommentData("count_dimension", requestCondition).subscribe(count_dimension => {
                this.count_dimension = count_dimension;
                console.log("count_dimension", this.count_dimension);
            },
            err => {
                console.log(err);
            });

            //获取维度情感指数
            this.commentService.getCommentData("sentiment_dimension", requestCondition).subscribe(sentiment_dimension => {
                this.sentiment_dimension = sentiment_dimension;
                console.log("sentiment_dimension", this.sentiment_dimension);
            },
            err => {
                console.log(err);
            });

            //获取评论热词
            this.commentService.getCommentData("hotkey", requestCondition).subscribe(hotkey => {
                this.hotkey = hotkey;
                console.log("hotkey", this.hotkey);
                this.initTagCloud();
            },
            err => {
                console.log(err);
            });

            //获取Top10评论话题
            this.commentService.getCommentData("top10_topic", requestCondition).subscribe(top10_topic => {
                this.top10_topic = top10_topic;
                this.parseTop10Topic()
                console.log("top10_topic", this.top10_topic);
            },
            err => {
                console.log(err);
            });
        }
    }

    private parseTop10Topic() {
        for (var i = 0; i < this.top10_topic.length; ++i) {
            if (this.top10_topic[i].list) {
                while (this.top10_topic[i].list.length < 10) {
                    var fake = {
                        key: "暂无",
                        value: 0
                    };
                    this.top10_topic[i].list.push(fake);
                }
            }
        }
    }

    private getSelectedBrand() {
        var result = [];
        for (var i = 0; i < this.brands.length; ++i) {
            if (this.condition.selectedBrand[this.brands[i].brand]) result.push(this.brands[i].brand);
        }
        return result;
    }
    

    public initTagCloud() {
        var string_ = [];
        for (var i = 0; i < this.hotkey.length; ++i) {
            var str = "";
            for (var j = 0; j < this.hotkey[i].list.length; ++j) {
                var string_f = this.hotkey[i].list[j].key;
                var string_n = this.hotkey[i].list[j].value;
                str += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list'}},";
            }
            string_.push(str);
        }

        $(function() {
            for (var i = 0; i < word_list.length; ++i) {
                var id = "#tag_cloud_" + i;
                $(id).empty();
                $(id).jQCloud(word_list[i]);
            }
        });
        var word_list = [];
        for (var i = 0; i < string_.length; ++i) {
            word_list[i] = eval("[" + string_[i] + "]");
        }
    }

    public getCommentDetail(brand, topic) {
        let reqData = {
            category: this.condition.selectedCategory,
            brand: brand,
            topic: topic,
            bdate: moment(this.condition.timeRange.startDate).format("YYYY-MM-DD"),
            edate: moment(this.condition.timeRange.endDate).format("YYYY-MM-DD") 
        };
        this.commentService.getCommentDetail(reqData).subscribe(comment_detail => {
                this.comment_detail = comment_detail;
                console.log("comment_detail", this.comment_detail);
            },
            err => {
                console.log(err);
            });
    }

}
