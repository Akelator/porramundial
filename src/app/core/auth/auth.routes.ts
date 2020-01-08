import { VerifyEmailDoneComponent } from "./pages/verify-email-done/verify-email-done.component";
import { VerifyEmailRequestComponent } from "./pages/verify-email-request/verify-email-request.component";
import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AuthComponent } from "./component/auth.component";
import { Page404Component } from "src/app/shared/pages/page404/page404.component";
import { SignUpPageComponent } from "./pages/sign-up-page/sign-up-page.component";

export const AuthRoutes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "sign-up",
        component: SignUpPageComponent
      },
      {
        path: "login",
        component: LoginPageComponent
      },
      {
        path: "verify-email-request",
        component: VerifyEmailRequestComponent
      },
      {
        path: "verify-email-done",
        component: VerifyEmailDoneComponent
      },
      {
        path: "**",
        component: Page404Component
      }
    ]
  }
];
