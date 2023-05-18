import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalFeedComponent } from './components/globalFeed/globalFeed.component';
import { RouterModule } from '@angular/router';
import { FeedModule } from 'src/app/shared/modules/feed/feed.module';
import { TopTagsModule } from '../shared/modules/topTags/topTags.module';

const routes = [{ path: 'ads', component: GlobalFeedComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    TopTagsModule,
  ],
  declarations: [GlobalFeedComponent],
})
export class GlobalFeedModule {}
