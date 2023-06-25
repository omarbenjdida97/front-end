import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateAdComponent } from 'src/app/createAd/components/createAd/createAd.component';
import { AdFormModule } from 'src/app/shared/modules/adForm/adForm.module';
import { CreateAdService } from 'src/app/createAd/services/createAd.service';
import { EffectsModule } from '@ngrx/effects';
import { CreateAdEffect } from 'src/app/createAd/store/effects/createAd.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/createAd/store/reducers';
import { SidebarModule } from '../shared/modules/sideBar/sidebar.module';

const routes = [{ path: 'ads/new', component: CreateAdComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdFormModule,
    EffectsModule.forFeature([CreateAdEffect]),
    StoreModule.forFeature('createAd', reducers),
    SidebarModule
  ],
  declarations: [CreateAdComponent],
  providers: [CreateAdService],
})
export class CreateAdModule {}
