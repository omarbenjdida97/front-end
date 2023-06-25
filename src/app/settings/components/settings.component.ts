import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import {
  validationErrorsSelector,
  isSubmittingSelector,
} from 'src/app/settings/store/selectors';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';
import { updateCurrentUserAction } from 'src/app/auth/store/actions/updateCurrentUser.action';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';

@Component({
  selector: 'egate-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.intializeValues();
    this.intializeListeners();
  }
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
  intializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }
  intializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
       
        console.log('currentUser', currentUser);
      
        this.initializeForm();
      });
  }
  initializeForm(): void {
    this.form = this.fb.group({
      username: this.currentUser.username,
      image: this.currentUser.image,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      phoneNumber: this.currentUser.phoneNumber,
      password: '',
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    }
    console.log('currentUserInput', currentUserInput);
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
