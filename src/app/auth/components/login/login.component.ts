import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loginAction, loginSuccessAction } from 'src/app/auth/store/actions/login.action';
import { Observable } from 'rxjs';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/auth/store/selectors';
import { LoginRequestInterface } from 'src/app/shared/types/loginRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'egate-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  returnUrl: string;
  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  } 

  ngOnInit(): void {
    this.intiliazeForm();
    this.intiliazeValues();
   
  }

  intiliazeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }
  intiliazeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(loginAction({ request, returnUrl: this.returnUrl}));
    

   
}

}
