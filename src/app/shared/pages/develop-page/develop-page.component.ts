import { LangService } from "./../../lang/lang.service";
import { Component, OnInit } from "@angular/core";
import { lang } from "../../lang/lang";
import { LangDirective } from "../../lang/lang.directive";

@Component({
  selector: "develop-page",
  templateUrl: "./develop-page.component.html",
  styleUrls: ["./develop-page.component.scss"]
})
export class DevelopPageComponent extends LangDirective implements OnInit {
  constructor(public langService: LangService) {
    super(langService);
  }

  ngOnInit() {}
}
