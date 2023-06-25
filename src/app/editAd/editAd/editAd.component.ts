import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import {
  adSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/editAd/store/selectors';
import { AdInputInterface } from 'src/app/shared/types/adInput.interface';
import { getAdAction } from '../store/actions/getAd.action';
import { ActivatedRoute } from '@angular/router';
import { isLoadingSelector } from '../store/selectors';
import { AdInterface } from 'src/app/shared/types/ad.interface';
import { updateAdAction } from '../store/actions/updateAd.action';

@Component({
  selector: 'egate-edit-ad',
  templateUrl: './editAd.component.html',
  styleUrls: ['./editAd.component.css'],
})
export class EditAdComponent implements OnInit {
  initialValues$: Observable<AdInputInterface>;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  isLoading$: Observable<boolean>;
  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.intiliazeValues();
    this.fetchData();
    
  }

  intiliazeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(adSelector),
      filter(Boolean),
      map((ad: AdInterface) => {
        return {
          title: ad.title,
          type: [''],
          description: ad.description,
          requiredSkills: ad.requiredSkills,
          location: ad.location,
          aboutAuthor: ad.aboutAuthor,
          hourlyRate: ad.hourlyRate,
          subject: ad.subject,
          tagList: ad.tagList,
          longitude: ad.longitude,
          latitude: ad.latitude,
        };
      }),
    );
  }

  fetchData(): void {
    this.store.dispatch(getAdAction({ slug: this.slug }));
  }

  onSubmit(adInput: AdInputInterface): void {
    this.store.dispatch(updateAdAction({slug: this.slug, adInput }));
  }
}
