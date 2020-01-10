import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Page404Component } from "./pages/page404/page404.component";
import { DevelopPageComponent } from "./pages/develop-page/develop-page.component";
import { ToolBarComponent } from "./components/tool-bar/tool-bar.component";
import { PopupComponent } from "./components/popup/popup.component";
import { ChatBarComponent } from "./components/chat-bar/chat-bar.component";
import { LangDirective } from './lang/lang.directive';

const sharedPages = [Page404Component, DevelopPageComponent];
const sharedComponents = [ToolBarComponent, PopupComponent, ChatBarComponent];

@NgModule({
  declarations: [...sharedComponents, ...sharedPages, LangDirective],
  imports: [CommonModule],
  exports: [sharedComponents]
})
export class SharedModule {}
