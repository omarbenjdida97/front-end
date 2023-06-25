import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from 'src/app/settings/components/settings.component';
import { reducers } from 'src/app/settings/store/reducers';
import { BackendErrorsMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module';
import { SidebarModule } from '../shared/modules/sideBar/sidebar.module';

const routes = [{ path: 'settings', component: SettingsComponent },
{ path: 'profile/:user', component: SettingsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
    BackendErrorsMessagesModule,
    ReactiveFormsModule,
    SidebarModule
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
