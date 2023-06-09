import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AdInterface } from 'src/app/shared/types/ad.interface';
import { AdInputInterface } from 'src/app/shared/types/adInput.interface';
import { SaveAdResponseInterface } from 'src/app/shared/types/saveAdResponse.interface';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class EditAdService {
  constructor(private http: HttpClient) {}

  updateAd(slug: string, adInput: AdInputInterface): Observable<AdInterface> {
    const fullUrl = environment.API_KEY + "/ads/" + slug;
    return this.http.put<SaveAdResponseInterface>(fullUrl, adInput).pipe(
      map((response: SaveAdResponseInterface) => {
        return response.ad;
      }),
    );
  }
}
