import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from 'src/app/shared/modules/sideBar/components/sidebar.component';


@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SideBarComponent],
    exports: [SideBarComponent],

})
export class SidebarModule {}
