import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {

  constructor(private http: Http) { }

  public getCommentData(type) {
      let url = "src/mock-data/" + type + ".json";
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
}
