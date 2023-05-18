import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TopBarModule } from 'src/app/shared/modules/topBar/topBar.module';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { AuthInterseptor } from 'src/app/shared/services/authinterceptor.service';
import { GlobalFeedModule } from 'src/app/globalFeed/globalFeed.module';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { AdModule } from 'src/app/ad/ad.module';
import { CreateAdModule } from 'src/app/createAd/createAd.module';
import { EditAdModule } from './editAd/editAd.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    EffectsModule.forRoot([]),
    TopBarModule,
    GlobalFeedModule,
    CreateAdModule,
    AdModule,
    EditAdModule
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
