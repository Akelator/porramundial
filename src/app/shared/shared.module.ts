import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Page404Component } from "./pages/page404/page404.component";
import { DevelopPageComponent } from "./pages/develop-page/develop-page.component";
import { ToolBarComponent } from "./components/tool-bar/tool-bar.component";

const sharedPages = [Page404Component, DevelopPageComponent];
const sharedComponents = [ToolBarComponent];

@NgModule({
  declarations: [...sharedComponents, ...sharedPages],
  imports: [CommonModule],
  exports: [sharedComponents]
})
export class SharedModule {}
