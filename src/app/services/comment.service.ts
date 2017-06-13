import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';


@Injectable()
export class CommentService {

    constructor(private http: Http,
                private apiService: ApiService) {}

    public getCategory() {
        let url = this.apiService.api["category"];
        // let url = "src/mock-data/" + type + ".json";
        return this.http.get(url)
            .map((res: Response) => {
                let data = res.json();
                if (data.code != 200) {
                    return Observable.throw("error");
                }
                return data.result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getCommentData(type, condition) {
        let url = this.apiService.api[type];
        // let url = "src/mock-data/" + type + ".json";
        return this.http.post(url, condition)
            .map((res: Response) => {
                let data = res.json();
                if (data.code != 200) {
                    return Observable.throw("error");
                }
                return data.result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getCommentDetail(data) {
        let url = this.apiService.api['comment_detail'];
        // let url = "src/mock-data/comment_detail.json";
        
        return this.http.post(url, data)
            .map((res: Response) => {
                let data = res.json();
                if (data.code != 200) {
                    return Observable.throw("error");
                }
                return data.result;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
