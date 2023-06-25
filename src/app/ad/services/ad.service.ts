import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdInterface } from "src/app/shared/types/ad.interface";
import { environment } from "src/environments/environment.development";

@Injectable()
export class AdService {
    constructor(private http: HttpClient) {}
    deleteAd(slug: string): Observable<{}> {
        const url = `${environment.API_KEY}/ads/${slug}`;
        return this.http.delete<{}>(url);
    }
    getAdsByAuthorId(authorId: number): Observable<AdInterface> {   
        const url = `${environment.API_KEY}/ads?author=${authorId}`;
        return this.http.get<AdInterface>(url);
      }
      getAdsByTag(tag: string): Observable<AdInterface[]> {   
        const url = `${environment.API_KEY}/ads?tags=${tag}`;
        return this.http.get<AdInterface[]>(url);
      }
      getAdsByNear(latitude: number, longitude:number): Observable<AdInterface[]> {   
        const url = `${environment.API_KEY}/ads?latitude=${latitude}&longitude=${longitude}`;
        return this.http.get<AdInterface[]>(url);
      }
      applyToAd(slug: string): Observable<AdInterface> {   
        const url = `${environment.API_KEY}/ads/${slug}/apply`;
        return this.http.post<AdInterface>(url, {});
      }
}