import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable()
export class AdService {
    constructor(private http: HttpClient) {}
    deleteAd(slug: string): Observable<{}> {
        const url = `${environment.API_KEY}/ads/${slug}`;
        return this.http.delete<{}>(url);
    }
}