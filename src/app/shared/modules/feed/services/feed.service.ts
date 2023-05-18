import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";

@Injectable()
export class FeedService {
    constructor(private http : HttpClient) {}
  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.API_KEY + url;
    return this.http.get<GetFeedResponseInterface>(fullUrl);
   
  }
}