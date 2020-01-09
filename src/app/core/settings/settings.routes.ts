import { Routes } from "@angular/router";
import { Page404Component } from "src/app/shared/pages/page404/page404.component";
import { SettingsComponent } from "./components/settings.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";

//import { Page403Component, Page404Component } from "shared";

export const SettingsRoutes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "profile",
        component: ProfilePageComponent
      },
      {
        path: "**",
        component: Page404Component
      }
    ]
  }
];
