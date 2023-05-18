import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/shared/modules/topTags/store/reducers';
import { GetTopTagsEffect } from 'src/app/shared/modules/topTags/store/effects/getTopTags.effect';
import { TopTagsComponent } from 'src/app/shared/modules/topTags/components/topTags/topTags.component';
import { TopTagsService } from './services/topTags.service';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [ 
    CommonModule,
    StoreModule.forFeature('topTags', reducers),
    EffectsModule.forFeature([GetTopTagsEffect]),
    RouterModule, 
  ],
  declarations: [TopTagsComponent],
  exports: [TopTagsComponent],
  providers: [TopTagsService],
})
export class TopTagsModule {}
