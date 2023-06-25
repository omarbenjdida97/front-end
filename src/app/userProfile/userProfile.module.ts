import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from 'src/app/userProfile/components/userProfile.component';

const routes: Routes = [
  {
    path: 'profiles/:slug',
       component: UserProfileComponent
  },
  {
    path: 'profiles/:slug/favorites',
       component: UserProfileComponent
  },
];
@NgModule({
   declarations: [UserProfileComponent],
  imports: [
    CommonModule /* EffectsModule.forFeature([UserProfileEffect])*/,
    RouterModule.forChild(routes),
  ],

  // providers: [UserProfileService],
})
export class UserProfileModule {}
