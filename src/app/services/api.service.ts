import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    public api;
    private base = "http://192.168.0.6:8080/insight";

    constructor() {
        this.api = {};
        this.api.category = this.base + '/category';
        this.api.comment_count = this.base + '/comment_count';
        this.api.sentiment = this.base + '/sentiment';
        this.api.count_dimension = this.base + '/count_dimension';
        this.api.sentiment_dimension = this.base + '/sentiment_dimension';
        this.api.hotkey = this.base + '/hotkey';
        this.api.top10_topic = this.base + '/top10_topic';
    }
}
