import { Page404Component } from "./shared/pages/page404/page404.component";
import { Routes } from "@angular/router";

//import { Page403Component, Page404Component } from "shared";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./core/main/main.module").then(m => m.MainModule),
    data: { state: "main", preload: true, delay: false }
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./core/auth/auth.module").then(m => m.AuthModule),
    data: { state: "load", preload: true, delay: false }
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./core/settings/settings.module").then(m => m.SettingsModule),
    data: { state: "load", preload: true, delay: false }
  },
  {
    path: "error",
    component: Page404Component
  }

  // { path: "reports/:id", component: ReportPreviewPageComponent },
  // {
  //   path: "error",
  //   component: Page404Component
  // },
  // {
  //   path: "**",
  //   component: Page404Component
  // }
];
