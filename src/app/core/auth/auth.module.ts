import { SharedModule } from "./../../shared/shared.module";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AuthRoutes } from "./auth.routes";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./components/auth.component";
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";
import { VerifyEmailRequestComponent } from "./pages/verify-email-request/verify-email-request.component";
import { VerifyEmailDoneComponent } from "./pages/verify-email-done/verify-email-done.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from "@angular/material";
const modulePages = [
  LoginPageComponent,
  SignUpPageComponent,
  VerifyEmailRequestComponent,
  VerifyEmailDoneComponent
];

@NgModule({
  declarations: [AuthComponent, ...modulePages],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule {}
