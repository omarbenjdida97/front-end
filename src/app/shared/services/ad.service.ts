import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { AdInterface } from "../types/ad.interface";
import { GetAdResponseInterface } from "../types/getAdResponse.interface";

@Injectable()
export class AdService {
  constructor(
    private http: HttpClient,
  ) {}

  getAd(slug: string): Observable<AdInterface> {
    const fullUrl = `${environment.API_KEY}/ads/${slug}`;
    return this.http.get<GetAdResponseInterface>(fullUrl).pipe(
      map((response: GetAdResponseInterface) => {
        const ad = response.ad;
        
        return ad;
      })
    );
  }

 
}
