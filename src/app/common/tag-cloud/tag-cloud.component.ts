import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-tag-cloud',
    templateUrl: './tag-cloud.component.html',
    styleUrls: ['./tag-cloud.component.scss']
})
export class TagCloudComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        var data = [
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

        var string_ = "";
        for (var i = 0; i < data.length; i++) {
            var string_f = data[i][0];
            var string_n = data[i][1];
            string_ += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list'}},";
        }

        $(function() {
            $("#my_favorite_latin_words").jQCloud(word_list);
        });
        var string_list = string_;
        var word_list = eval("[" + string_list + "]");
    }

}
