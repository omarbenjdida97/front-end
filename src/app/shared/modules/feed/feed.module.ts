import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeedComponent } from 'src/app/shared/modules/feed/components/feed/feed.component';
import { FeedService } from 'src/app/shared/modules/feed/services/feed.service';
import { EffectsModule } from '@ngrx/effects';
import {GetFeedEffect } from 'src/app/shared/modules/feed/store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/shared/modules/feed/store/reducers';
import { RouterModule } from '@angular/router';
import { PaginationModule } from "src/app/shared/modules/pagination/pagination.module";
import { TagListModule } from 'src/app/shared/modules/tagList/tagList.module';
import { TopTagsModule } from 'src/app/shared/modules/topTags/topTags.module';
import { AddToFavoritesModule } from 'src/app/shared/modules/addToFavorites/addToFavorites.module';
import { FormsModule } from '@angular/forms';
import { TagSearchPipe } from './components/tagSearch.pipe';

@NgModule({
    declarations: [FeedComponent, TagSearchPipe],
    exports: [FeedComponent],
    providers: [FeedService],
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetFeedEffect]),
        StoreModule.forFeature('feed', reducers),
        RouterModule,
        PaginationModule,
        TagListModule,
        TopTagsModule,
        AddToFavoritesModule,
        FormsModule,
        
    ]
})
export class FeedModule {}
