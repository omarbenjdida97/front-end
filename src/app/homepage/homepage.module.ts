import { NgModule } from '@angular/core';
import { HomepageComponent } from './components/homepage.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes = [{ path: '', component: HomepageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  declarations: [HomepageComponent],
  exports: [HomepageComponent],
})
export class HomepageModule {}
