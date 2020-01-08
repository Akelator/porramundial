import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.scss"]
})
export class ToolBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onBack() {
    this.router.navigate([""]);
  }

  onLogin() {
    this.router.navigate(["auth/login"]);
  }
  onSignUp() {
    this.router.navigate(["auth/sign-up"]);
  }
}
