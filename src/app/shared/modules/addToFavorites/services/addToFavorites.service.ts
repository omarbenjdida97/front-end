import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AdInterface } from "src/app/shared/types/ad.interface";
import { GetAdResponseInterface } from "src/app/shared/types/getAdResponse.interface";
import { environment } from "src/environments/environment.development";

@Injectable()
export class AddToFavoritesService {
    constructor(private http: HttpClient) {}

    addToFavorites(slug: string): Observable<AdInterface> {
        const url = this.getUrl(slug);
        return this.http.post(url, {}).pipe(map(this.getAd));
    }

    removeFromFavorites(slug: string): Observable<AdInterface> {
        const url = this.getUrl(slug);
        return this.http.delete(url).pipe(map(this.getAd));
    }

    getUrl(slug: string): string {
    return `${environment.API_KEY}/ads/${slug}/favorite`
    }

    getAd(response: GetAdResponseInterface): AdInterface {
    return response.ad;
    }
}