import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddToFavoritesComponent } from 'src/app/shared/modules/addToFavorites/components/addToFavorites.component';
import { AddToFavoritesService } from 'src/app/shared/modules/addToFavorites/services/addToFavorites.service';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesEffect } from 'src/app/shared/modules/addToFavorites/store/effects/addToFavoritesEffect';

@NgModule({
  declarations: [AddToFavoritesComponent],
  imports: [CommonModule, EffectsModule.forFeature([ AddToFavoritesEffect])],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
