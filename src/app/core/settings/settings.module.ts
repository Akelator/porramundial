import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsComponent } from "./components/settings.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { SettingsRoutes } from "./settings.routes";

@NgModule({
  declarations: [SettingsComponent, ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SettingsModule {}
