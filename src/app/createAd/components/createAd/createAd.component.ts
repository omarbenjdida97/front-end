import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/createAd/store/selectors';
import { createAdAction } from 'src/app/createAd/store/actions/createAd.action';
import { AdInputInterface } from 'src/app/shared/types/adInput.interface';

@Component({
  selector: 'egate-create-ad',
  templateUrl: './createAd.component.html',
  styleUrls: ['./createAd.component.css'],
})
export class CreateAdComponent implements OnInit{
  
  initialValues: AdInputInterface = {
    title: '',
    description: '',
    location: '',
    requiredSkills:[''],
    hourlyRate: 0,
    subject: '',
    tagList: [''],
    type: [''],
    aboutAuthor: '',
    longitude: 0,
    latitude: 0,
  };
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(adInput: AdInputInterface ): void {
    this.store.dispatch(createAdAction({ adInput }));
  }
}
