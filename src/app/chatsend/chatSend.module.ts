import { CommonModule } from "@angular/common";
import { ChatSendComponent } from "./chat.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChatSendService } from "./services/chat.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SidebarModule } from "../shared/modules/sideBar/sidebar.module";

const routes = [{ path: 'chat', component: ChatSendComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SidebarModule
  ],
  declarations: [ChatSendComponent],
  providers: [ChatSendService],
})
export class ChatSendModule {}