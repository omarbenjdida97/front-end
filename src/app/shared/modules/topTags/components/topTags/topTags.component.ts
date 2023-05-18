import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTopTagsAction } from 'src/app/shared/modules/topTags/store/actions/getTopTags.action';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { errorSelector, isLoadingSelector, topTagsSelector } from 'src/app/shared/modules/topTags/store/selectors';

@Component({
  selector: 'egate-top-tags',
  templateUrl: './topTags.component.html',
})
export class TopTagsComponent implements OnInit {
  topTags$: Observable<PopularTagType[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

    initializeValues(): void {
    this.topTags$ = this.store.pipe(select(topTagsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    }
  fetchData(): void {
    this.store.dispatch(getTopTagsAction());
  }




  
}
