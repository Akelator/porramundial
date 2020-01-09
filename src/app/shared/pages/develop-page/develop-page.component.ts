import { Component, OnInit } from "@angular/core";
import { lang } from "../../lang/lang";

@Component({
  selector: "develop-page",
  templateUrl: "./develop-page.component.html",
  styleUrls: ["./develop-page.component.scss"]
})
export class DevelopPageComponent implements OnInit {
  txt = lang.eng;
  constructor() {}

  ngOnInit() {}
}
