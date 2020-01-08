import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MainRoutes } from "./main.routes";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(MainRoutes), SharedModule]
})
export class MainModule {}
