import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Observable,
  Subscription,
  combineLatest,
  filter,
  map,
  pipe,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { feedSelector } from 'src/app/shared/modules/feed/store/selectors';
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
@Component({
  selector: 'egate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  apiUrl: string;
  username:string;
  currentUsername: string;
  isCurrentUser$: Observable<boolean>;
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  feed$: Observable<GetFeedResponseInterface | null>;


  constructor(
    private authService: AuthService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.feed$ = this.store.pipe(select(feedSelector));
    
  }

  initializeValues(): void {
    this.currentUserSubscription = this.store
    .pipe(select(currentUserSelector), filter(Boolean))
    .subscribe((currentUser: CurrentUserInterface) => {
      this.currentUser = currentUser;
      console.log('currentUser', currentUser);
    });
    this.username= this.route.snapshot.paramMap.get('username');
    this.apiUrl = `/ads?author=${this.username}`;
  }

}
