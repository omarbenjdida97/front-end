import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector, isAnonynmousSelector, isLoggedInSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'egate-topbar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.css'],
})
export class TopBarComponent{
  isLoggedIn$: Observable<boolean>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {
   
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
   
    this.isAnonymous$ = this.store.select(isAnonynmousSelector);
   
    this.currentUser$ = this.store.select(currentUserSelector);
    
  }
  
}
