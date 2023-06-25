import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getFeedAction } from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from 'src/app/shared/modules/feed/store/selectors';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { parseUrl, stringify } from 'query-string';
import { getTopTagsAction } from 'src/app/shared/modules/topTags/store/actions/getTopTags.action';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { topTagsSelector } from 'src/app/shared/modules/topTags/store/selectors';
import { AdInterface } from 'src/app/shared/types/ad.interface';

@Component({
  selector: 'egate-feed2',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedTwoComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string;
  feed$: Observable<GetFeedResponseInterface | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  limit = environment.limit;
  topTags$: Observable<PopularTagType[] | null>;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;
  selectedTags: string[] = [];
  
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.intializeListeners();
    this.fetchFeed();
    this.fetchData();
  }

  intializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params.page || '1');
        this.fetchFeed();
      },
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.topTags$ = this.store.pipe(select(topTagsSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }
  getTagsFromAds(ads: AdInterface[]): string[] {
    if (!ads) {
      return [];
    }
    const tags = ads
      .flatMap((ad) => ad.tagList)
      .map((tag) => tag.trim().toLowerCase());

    const uniqueTags = [...new Set(tags)];
    return uniqueTags;
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const params: any = {
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    };
    
    if (this.selectedTags.length > 0) {
      params.tags = this.selectedTags.join(',');
    }
  
    const apiUrlWithParams = `${parsedUrl.url}?${stringify(params)}`;
  
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
    console.log(apiUrlWithParams);
  }
  fetchData(): void {
    this.store.dispatch(getTopTagsAction());
  }

  onTagSelectionChange(tag: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
      }
    } else {
      const index = this.selectedTags.indexOf(tag);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      }
    }
    this.fetchFeed();
  }
}
