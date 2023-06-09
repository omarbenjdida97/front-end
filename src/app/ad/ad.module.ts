import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AdComponent } from 'src/app/ad/ad/ad.component';
import { AdService as SharedAdService } from 'src/app/shared/services/ad.service';
import { GetAdEffect } from 'src/app/ad/store/effects/getAd.effect';
import { reducers } from 'src/app/ad/store/reducers';
import { TagListModule } from "src/app/shared/modules/tagList/tagList.module";
import { DeleteAdEffect } from 'src/app/ad/store/effects/deleteAd.effect';
import { AdService } from 'src/app/ad/services/ad.service';
import { AdCommentComponent } from './ad/adComment.component';
import { CommentsService } from '../shared/services/comment.service';
import { ApiService } from '../shared/services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatSendComponent } from '../chatsend/chat.component';

const routes = [{ path: 'ads/:slug', component: AdComponent }];

@NgModule({
  
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('ad', reducers),
        EffectsModule.forFeature([GetAdEffect, DeleteAdEffect]),
        TagListModule,
        ReactiveFormsModule 
    ],
    declarations: [AdComponent, AdCommentComponent],
    exports: [],
    providers: [SharedAdService, AdService, CommentsService, ApiService, ChatSendComponent],
})
export class AdModule {}
