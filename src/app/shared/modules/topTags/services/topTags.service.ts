import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PopularTagType } from"src/app/shared/types/popularTag.type";
import { environment } from "src/environments/environment.development";
import { GetTopTagsResponseInterface } from "src/app/shared/modules/topTags/types/getTopTagsResponse.interface";
@Injectable()
export class TopTagsService {
    constructor(private http: HttpClient) {}
    getTopTags(): Observable<PopularTagType[]> {
        const url = environment.API_KEY + '/ads';
        return this.http.get(url).pipe((map((response: GetTopTagsResponseInterface) => {
            
            return response.tagList;
        })))
    }
}