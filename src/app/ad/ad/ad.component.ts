import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest, map, pipe } from 'rxjs';
import { getAdAction } from 'src/app/ad/store/actions/getAd.action';
import { AdInterface } from 'src/app/shared/types/ad.interface';
import {
  adSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/ad/store/selectors';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { deleteAdAction } from 'src/app/ad/store/actions/deleteAd.action';

@Component({
  selector: 'egate-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css'],
})
export class AdComponent implements OnInit, OnDestroy {
  slug: string;
  ad: AdInterface;
  adSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.intitializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.adSubscription.unsubscribe();
  }

  intitializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(adSelector)),
      this.store.pipe(select(currentUserSelector)),
    ).pipe(
      map(
        ([ad, currentUser]: [
          AdInterface | null,
          CurrentUserInterface | null,
        ]) => {
          if (!ad || !currentUser) {
            return false;
          }
          return currentUser.id === ad.author.id;
        },
      ),
    );
  }

  initializeListeners(): void {
    this.adSubscription = this.store
      .pipe(select(adSelector))
      .subscribe((ad: AdInterface | null) => {
        this.ad = ad;
      });
  }
  fetchData(): void {
    this.store.dispatch(getAdAction({ slug: this.slug }));
  }
  deleteAd(): void {
    this.store.dispatch(deleteAdAction({ slug: this.slug }));
  }
}
