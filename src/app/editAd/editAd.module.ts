import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdFormModule } from 'src/app/shared/modules/adForm/adForm.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/editAd/store/reducers';
import { GetAdEffect } from './store/effects/getAd.effect';
import { UpdateAdEffect } from './store/effects/updateAd.effect';
import { EditAdComponent } from './editAd/editAd.component';
import { AdService as SharedAdService} from '../shared/services/ad.service';
import { EditAdService } from './services/editAd.service';

const routes = [{ path: 'ads/:slug/edit', component: EditAdComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdFormModule,
    EffectsModule.forFeature([UpdateAdEffect, GetAdEffect]),
    StoreModule.forFeature('editAd', reducers),
  ],
  declarations: [EditAdComponent],
  providers: [EditAdService, SharedAdService],
})
export class EditAdModule {}
