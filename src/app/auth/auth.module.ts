import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { reducers } from "src/app/auth//store/reducers";
import { RegisterEffect } from "src/app/auth/store/effects/register.effect";
import { EffectsModule } from "@ngrx/effects";
import { AuthService } from "src/app/auth/services/auth.service";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { BackendErrorsMessagesModule } from "src/app/shared/modules/backendErrorMessages/backendErrorMessages.module";
import { LoginEffect } from "src/app/auth/store/effects/login.effect";
import { LoginComponent } from "src/app/auth/components/login/login.component";
import { GetCurrentUserEffect } from "src/app/auth/store/effects/getCurrentUser.effect";


const routes = [
    {path:'register', 
    component: RegisterComponent},
    {path:'login', 
    component: LoginComponent}
]

@NgModule({
    imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule, 
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
    BackendErrorsMessagesModule
    ],
    declarations: [RegisterComponent, LoginComponent],
    providers: [AuthService, PersistanceService],
    
})
export class AuthModule {}