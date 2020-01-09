import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/core/auth/services/auth.service";
import { UserSummary } from "src/app/core/auth/models/user";

@Component({
  selector: "tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.scss"]
})
export class ToolBarComponent implements OnInit, OnDestroy {
  userData: UserSummary;

  _sub;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this._sub = this.authService.userData$.subscribe(userData => {
      this.userData = userData;
      if (!this.userData) {
        this.router.navigate([""]);
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  onBack() {
    this.router.navigate([""]);
  }

  onLogIn() {
    this.router.navigate(["auth/login"]);
  }
  onSignUp() {
    this.router.navigate(["auth/sign-up"]);
  }

  onLogOut() {
    this.authService.SignOut().then(() => {
      this.router.navigate([""]);
    });
  }

  onProfile() {
    this.router.navigate(["settings/profile"]);
  }
}
