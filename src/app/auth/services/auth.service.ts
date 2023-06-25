import { Injectable } from '@angular/core';

import { RegisterRequestInterface } from 'src/app/shared/types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { environment } from 'src/environments/environment.development';
import { AuthResponseInterface } from 'src/app/shared/types/authResponse.interface';
import { HttpClient } from '@angular/common/http';
import { LoginRequestInterface } from 'src/app/shared/types/loginRequest.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.API_KEY + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.API_KEY + '/users/login';
    
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
      
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.API_KEY + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  updateCurrentUser(
    data: CurrentUserInputInterface,
  ): Observable<CurrentUserInterface> {
    const url = environment.API_KEY + '/user';
    console.log('data', data);
    return this.http.put(url, data).pipe(map(this.getUser));
  }
}
