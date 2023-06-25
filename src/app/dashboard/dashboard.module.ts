import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from 'src/app/dashboard/components/dashboard.component';
import { RouterModule } from '@angular/router';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FeedTwoModule } from '../shared/modules/feed/feed2/feedTwo.module';
import { SidebarModule } from '../shared/modules/sideBar/sidebar.module';

const routes = [{ path: 'dashboard/:username', component: DashboardComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeedTwoModule, SidebarModule],
  declarations: [DashboardComponent],
  exports: [],
})
export class DashboardModule {}
